import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Researched Panama Knowledge for Cabrera Coffee Brew House
const CABRERA_GROUNDED_CONTEXT = `
You are the Official AI Barista Concierge for "Cabrera Coffee Brew House" in Panama.
Researched Venue Information:
- Flagship Location: Plaza Paseo Costa Verde, Local #12, Boulevard Costa Verde, La Chorrera, Panamá Oeste, Panama.
- Second Location: Vía Argentina, El Cangrejo, Bella Vista, Ciudad de Panamá.
- Distinctions: The 1st specialty coffee shop and micro-roastery in Panama Oeste.
- Founder & Head Barista: Yenievsky Cabrera.
- Official Phone & WhatsApp: +507 6603-9178.
- Country Time Zone: Panama Local Time (America/Panama, UTC-5, no Daylight Saving Time).
- Official Hours (Panama Time):
  * Monday: CLOSED (Roasting, equipment maintenance, and team rest).
  * Tuesday - Friday: 7:00 AM – 7:30 PM.
  * Saturday: 8:00 AM – 7:30 PM.
  * Sunday: 8:00 AM – 4:00 PM.
- Specialties & Beans:
  * Panamanian high-altitude lots from Boquete, Volcán, and Renacimiento, Chiriquí.
  * Geisha natural & washed from Finca Bernardina, Boquete Typica Natural, SL-34, Pacamara.
  * Signature drinks: "Aunt Beru" (Specialty mocktail with coconut cold foam & lemon zest), Biscoff Iced Coffee Latte, The Nordic & Latte Art Flight, 18-hour cold brew.
  * Brunch & Bites: Shakshuka Panameña (local tableño chorizo & country cheese), Desayuno Istmeño, Capellane Toast, Brioche French Toast, Angus Burger with potato fries and sweet potato wedges (camotes).
  * Local Panama payment methods accepted: Yappy (Banco General), Nequi Panamá, Visa, Mastercard, Cash on dine-in/takeout.
`;

// AI Concierge API Route with Search Grounding using gemini-3.5-flash
app.post('/api/concierge', async (req: Request, res: Response) => {
  try {
    const { prompt, lang = 'es' } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Return grounded response using local researched database
      res.json({
        reply: lang === 'en'
          ? "Welcome to Cabrera Coffee Brew House in Costa Verde, Panama! We are open Tuesday to Friday (7:00 AM - 7:30 PM), Saturday (8:00 AM - 7:30 PM), and Sunday (8:00 AM - 4:00 PM) in Panama Time. For reservations or specialty Boquete Geisha beans, visit our Costa Verde plaza location or call +507 6603-9178."
          : "¡Bienvenido a Cabrera Coffee Brew House en Costa Verde, Panamá! Atendemos de Martes a Viernes (7:00 AM - 7:30 PM), Sábados (8:00 AM - 7:30 PM) y Domingos (8:00 AM - 4:00 PM) en hora oficial de Panamá (lunes cerrado por tueste). Para reservas o café Geisha de Boquete, contáctanos al WhatsApp +507 6603-9178.",
        groundedWithSearch: false,
        sources: [
          { title: "Cabrera Coffee Brew House · Costa Verde, Panamá", uri: "https://maps.google.com/?q=Cabrera+Coffee+Brew+House+Costa+Verde" }
        ]
      });
      return;
    }

    const ai = new GoogleGenAI({ apiKey });

    try {
      // Use gemini-3.5-flash with googleSearch tool as specified in the feature block
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `${CABRERA_GROUNDED_CONTEXT}\n\nUser Question: ${prompt}\n\nPlease respond courteously and accurately as the Cabrera Coffee Brew House barista concierge in ${lang === 'en' ? 'English' : 'Spanish'}. Always respect the official Panama country time (UTC-5) and provide real location details in Costa Verde, Panama.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const reply = response.text || '';

      // Extract search grounding metadata if available
      const candidate = response.candidates?.[0];
      const searchChunks = candidate?.groundingMetadata?.groundingChunks || [];
      const sources = searchChunks
        .filter((chunk: any) => chunk.web?.uri)
        .map((chunk: any) => ({
          title: chunk.web?.title || 'Google Search Source',
          uri: chunk.web?.uri || '',
        }))
        .slice(0, 4);

      res.json({
        reply,
        groundedWithSearch: true,
        sources,
      });
    } catch (genAiError: any) {
      console.warn('Gemini 3.5 Flash Search Grounding error or rate limit:', genAiError.message);

      // Provide authentic grounded response from pre-researched knowledge base
      const fallbackReply = lang === 'en'
        ? `Cabrera Coffee Brew House is located at Plaza Paseo Costa Verde, Blvd. Costa Verde, La Chorrera, Panama. Open Tuesday–Friday 7:00 AM–7:30 PM, Saturday 8:00 AM–7:30 PM, and Sunday 8:00 AM–4:00 PM (Panama Time UTC-5, Mondays closed for roasting). Featuring Geisha coffee from Boquete, Chiriquí, signature Cold Brew, and artisanal Panamanian brunch.`
        : `Cabrera Coffee Brew House está ubicado en Plaza Paseo Costa Verde, Blvd. Costa Verde, La Chorrera, Panamá Oeste. Nuestro horario en hora oficial de Panamá (UTC-5) es de Martes a Viernes de 7:00 AM a 7:30 PM, Sábados de 8:00 AM a 7:30 PM, y Domingos de 8:00 AM a 4:00 PM (lunes cerrado por tueste). Contamos con cafés Geisha de Boquete, Cold Brew de 18h y brunch artesanal.`;

      res.json({
        reply: fallbackReply,
        groundedWithSearch: false,
        sources: [
          { title: "Cabrera Coffee Brew House | Costa Verde, Panamá", uri: "https://maps.google.com/?q=Cabrera+Coffee+Brew+House+Costa+Verde" },
          { title: "WhatsApp Direct Barista (+507 6603-9178)", uri: "https://wa.me/50766039178" },
        ]
      });
    }
  } catch (err: any) {
    console.error('Server error handling concierge:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mount Vite or serve static
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cabrera Coffee Brew House server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
