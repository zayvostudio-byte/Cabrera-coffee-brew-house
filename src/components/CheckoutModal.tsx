import React, { useState } from 'react';
import { CartItem, OrderType, PaymentMethod, Order } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';
import confetti from 'canvas-confetti';
import {
  X,
  CreditCard,
  Smartphone,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Clock,
  Download,
  AlertCircle,
  QrCode,
  DollarSign,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  orderType: OrderType;
  tableNumber: string;
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  onOrderCompleted: (order: Order) => void;
  lang: Language;
  theme: 'luxury-clean' | 'dark';
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  orderType,
  tableNumber,
  subtotal,
  tax,
  tip,
  total,
  onOrderCompleted,
  lang,
  theme,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[lang];
  const isLight = theme === 'luxury-clean';

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupTime, setPickupTime] = useState(t.asapEstimate);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');

  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Yappy details
  const [yappyPhone, setYappyPhone] = useState('');

  // Processing & completed states
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Format Card Number (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  // Format Expiry (MM/YY)
  const handleExpiryChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg(lang === 'en' ? 'Please enter your full name.' : 'Por favor ingresa tu nombre completo.');
      return;
    }
    if (!customerPhone.trim()) {
      setErrorMsg(lang === 'en' ? 'Please enter your phone number or WhatsApp.' : 'Por favor ingresa tu número de WhatsApp o teléfono.');
      return;
    }

    if (paymentMethod === 'credit_card') {
      const cleanNum = cardNumber.replace(/\s/g, '');
      if (cleanNum.length < 15) {
        setErrorMsg(lang === 'en' ? 'Please enter a valid card number (15-16 digits).' : 'Por favor ingresa un número de tarjeta válido (15-16 dígitos).');
        return;
      }
      if (cardExpiry.length < 5) {
        setErrorMsg(lang === 'en' ? 'Please enter a valid expiry date (MM/YY).' : 'Ingresa la fecha de vencimiento válida (MM/AA).');
        return;
      }
      if (cardCvv.length < 3) {
        setErrorMsg(lang === 'en' ? 'Please enter the 3-digit CVV security code.' : 'Ingresa el código de seguridad CVV (3 o 4 dígitos).');
        return;
      }
    } else if (paymentMethod === 'yappy_ach') {
      if (!yappyPhone.trim() && !customerPhone.trim()) {
        setErrorMsg(lang === 'en' ? 'Please enter your Yappy mobile phone number.' : 'Por favor ingresa tu número de teléfono afiliado a Yappy.');
        return;
      }
    }

    // Begin simulated secure processing
    setIsProcessing(true);
    setProcessingStep(lang === 'en' ? 'Connecting securely to banking gateway...' : 'Conectando de forma segura con pasarela bancaria...');

    setTimeout(() => {
      setProcessingStep(lang === 'en' ? 'Encrypting payload via PCI-DSS tokenization...' : 'Encriptando transacción bajo norma PCI-DSS...');
    }, 900);

    setTimeout(() => {
      setProcessingStep(lang === 'en' ? 'Authorizing settlement with issuer...' : 'Confirmando pago con emisor...');
    }, 1800);

    setTimeout(() => {
      setIsProcessing(false);
      const orderNum = `CAB-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: orderNum,
        orderType,
        tableNumber: orderType === 'dine_in' ? (tableNumber || '4') : undefined,
        customerName,
        customerEmail,
        customerPhone,
        pickupTime: orderType === 'takeout' ? pickupTime : undefined,
        items: cartItems,
        subtotal,
        tax,
        tip,
        total,
        paymentMethod,
        paymentStatus: paymentMethod === 'cash_counter' ? 'pending' : 'paid',
        orderStatus: 'received',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setCompletedOrder(newOrder);
      onOrderCompleted(newOrder);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#b58548', '#d4a872', '#ffffff', '#181513'],
        });
      } catch (err) {}
    }, 2600);
  };

  const handleDownloadReceipt = () => {
    if (!completedOrder) return;
    const content = `===========================================
CABRERA COFFEE BREW HOUSE (ESTD 2018)
#THECOFFEEEXPERIENCE
Plaza Cabrera, Vía Principal, Panamá
Tel: +507 6890-4421 | Instagram: @CabreraCoffee
===========================================
RECEIPT / COMPROBANTE: #${completedOrder.orderNumber}
Time: ${completedOrder.createdAt}
Service: ${completedOrder.orderType === 'dine_in' ? `Dine-In (Table ${completedOrder.tableNumber})` : `Takeout (Ready: ${completedOrder.pickupTime})`}
Customer: ${completedOrder.customerName}
Phone: ${completedOrder.customerPhone}
Payment: ${completedOrder.paymentMethod.toUpperCase()} (${completedOrder.paymentStatus.toUpperCase()})
-------------------------------------------
ITEMS:
${completedOrder.items
  .map(
    (it) =>
      `${it.quantity}x ${lang === 'en' && it.item.nameEn ? it.item.nameEn : it.item.name} ${it.size ? `(${it.size})` : ''} - $${(it.unitPrice * it.quantity).toFixed(2)}\n   ${it.selectedMilk ? `Milk: ${it.selectedMilk}` : ''} ${it.selectedTemperature ? `Temp: ${it.selectedTemperature}` : ''}`
  )
  .join('\n')}
-------------------------------------------
Subtotal: $${completedOrder.subtotal.toFixed(2)}
ITBMS (7%): $${completedOrder.tax.toFixed(2)}
Gratuity: $${completedOrder.tip.toFixed(2)}
TOTAL PAID: $${completedOrder.total.toFixed(2)}
===========================================
Thank you for supporting craft coffee!
Your order is being lovingly prepared.
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Cabrera_Receipt_${completedOrder.orderNumber}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className={`relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border text-left ${
          isLight ? 'bg-white border-[#ded7ca] text-[#181513]' : 'bg-[#161310] border-[#3d3227] text-[#f7f5f0]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-5 border-b flex items-center justify-between ${
          isLight ? 'bg-[#fcfbf9] border-[#e8e2d6]' : 'bg-[#1a1612] border-[#2d241c]'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#b58548]/15 flex items-center justify-center text-[#b58548] border border-[#b58548]/30">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold">
                {completedOrder ? t.orderConfirmedTitle : t.checkoutTitle}
              </h3>
              <p className={`text-xs ${isLight ? 'text-[#706456]' : 'text-[#a6998b]'}`}>
                {completedOrder ? t.orderSentSubtitle : t.checkoutSubtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 opacity-60 hover:opacity-100 rounded-lg transition-opacity"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completedOrder ? (
          /* SUCCESS ORDER TRACKER VIEW */
          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            <div className={`text-center p-6 rounded-2xl border space-y-2 ${
              isLight ? 'bg-[#faf8f5] border-[#e2dacf]' : 'bg-[#1f1914] border-[#3e3226]'
            }`}>
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
              <div className="text-xs uppercase tracking-widest text-[#b58548] font-mono font-bold">
                #{completedOrder.orderNumber}
              </div>
              <h2 className="font-serif text-2xl font-bold">
                {t.thanksCustomer} {completedOrder.customerName.split(' ')[0]}!
              </h2>
              <p className={`text-xs max-w-md mx-auto leading-relaxed ${isLight ? 'text-[#6e6356]' : 'text-[#b8aca0]'}`}>
                {completedOrder.orderType === 'dine_in'
                  ? `${t.orderDineInConfirmation} (${completedOrder.tableNumber}).`
                  : `${t.orderTakeoutConfirmation} (${completedOrder.pickupTime}).`}
              </p>
            </div>

            {/* Live Order Tracker Stepper */}
            <div className={`p-5 rounded-xl border space-y-4 ${
              isLight ? 'bg-[#f7f5f0] border-[#ded5c5]' : 'bg-[#1b1713] border-[#31271f]'
            }`}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold">{t.orderTrackingStatus}</span>
                <span className="font-mono text-[#b58548] font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#b58548] animate-ping" />
                  {t.statusActivePrep}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                <div className={`p-2.5 rounded-lg border space-y-1 ${
                  isLight ? 'bg-white border-[#b58548]/40' : 'bg-[#271f18] border-[#b58548]/50'
                }`}>
                  <div className="font-bold text-[#b58548]">{t.stepReceived}</div>
                  <div className="text-[10px] opacity-75">{t.stepReceivedDesc}</div>
                </div>
                <div className={`p-2.5 rounded-lg border space-y-1 animate-pulse ${
                  isLight ? 'bg-white border-[#b58548]' : 'bg-[#271f18] border-[#b58548]'
                }`}>
                  <div className="font-bold">{t.stepBrewing}</div>
                  <div className="text-[10px] text-[#b58548] font-semibold">{t.stepBrewingDesc}</div>
                </div>
                <div className={`p-2.5 rounded-lg border space-y-1 opacity-50 ${
                  isLight ? 'bg-[#f0eae0] border-[#ddd4c4]' : 'bg-[#181411] border-[#2b221a]'
                }`}>
                  <div className="font-bold">{t.stepReady}</div>
                  <div className="text-[10px]">{t.stepReadyDesc}</div>
                </div>
              </div>
            </div>

            {/* Summary List */}
            <div className={`p-4 rounded-xl border space-y-3 ${
              isLight ? 'bg-[#faf8f5] border-[#e2dacf]' : 'bg-[#1a1612] border-[#2d241c]'
            }`}>
              <h4 className="text-xs uppercase tracking-wider font-bold">
                {t.dishesSummary} ({completedOrder.items.length})
              </h4>
              <div className={`divide-y ${isLight ? 'divide-[#eee7db]' : 'divide-[#261f18]'}`}>
                {completedOrder.items.map((it) => {
                  const itemName = lang === 'en' && it.item.nameEn ? it.item.nameEn : it.item.name;
                  return (
                    <div key={it.cartItemId} className="py-2 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold">{it.quantity}x {itemName}</span>
                        {it.size && <span className="opacity-70 ml-1">({it.size})</span>}
                        {it.selectedMilk && <span className="block text-[11px] opacity-75">{it.selectedMilk}</span>}
                      </div>
                      <span className="font-mono font-semibold text-[#b58548]">
                        ${(it.unitPrice * it.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className={`pt-2 border-t flex items-center justify-between font-bold text-sm ${
                isLight ? 'border-[#eee7db]' : 'border-[#261f18]'
              }`}>
                <span>{t.totalCharged}</span>
                <span className="font-mono text-base text-[#b58548]">${completedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleDownloadReceipt}
                className={`flex-1 py-3 px-4 text-xs font-semibold rounded-xl border transition-all flex items-center justify-center gap-2 ${
                  isLight
                    ? 'bg-white hover:bg-[#f4efe7] border-[#ded7ca]'
                    : 'bg-[#241c16] hover:bg-[#32271f] border-[#433527]'
                }`}
              >
                <Download className="w-4 h-4 text-[#b58548]" />
                <span>{t.downloadReceipt}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-[#b58548] hover:bg-[#9c6e33] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                {t.closeAndContinue}
              </button>
            </div>
          </div>
        ) : (
          /* PAYMENT FORM & METHOD SELECTION */
          <form onSubmit={handleSubmitPayment} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl flex items-center gap-2.5 text-xs text-rose-800">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Customer Details */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-bold">
                {t.customerDataTitle}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] mb-1 font-medium opacity-80">{t.fullNameLabel}</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Roberto De Gracia"
                    className={`w-full border rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#b58548] ${
                      isLight ? 'bg-[#faf8f5] border-[#ded7ca]' : 'bg-[#1c1713] border-[#342a20] text-white'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] mb-1 font-medium opacity-80">{t.whatsappLabel}</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+507 6000-0000"
                    className={`w-full border rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#b58548] ${
                      isLight ? 'bg-[#faf8f5] border-[#ded7ca]' : 'bg-[#1c1713] border-[#342a20] text-white'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] mb-1 font-medium opacity-80">{t.emailReceiptLabel}</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="roberto@email.com"
                  className={`w-full border rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#b58548] ${
                    isLight ? 'bg-[#faf8f5] border-[#ded7ca]' : 'bg-[#1c1713] border-[#342a20] text-white'
                  }`}
                />
              </div>

              {orderType === 'takeout' && (
                <div>
                  <label className="block text-[11px] mb-1 font-medium opacity-80">{t.pickupEstimateLabel}</label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className={`w-full border rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#b58548] ${
                      isLight ? 'bg-[#faf8f5] border-[#ded7ca]' : 'bg-[#1c1713] border-[#342a20] text-white'
                    }`}
                  >
                    <option value={t.asapEstimate}>{t.asapEstimate}</option>
                    <option value={t.in30Min}>{t.in30Min}</option>
                    <option value={t.in45Min}>{t.in45Min}</option>
                    <option value={t.in1Hour}>{t.in1Hour}</option>
                    <option value={t.lunchTime}>{t.lunchTime}</option>
                    <option value={t.afternoonTime}>{t.afternoonTime}</option>
                  </select>
                </div>
              )}
            </div>

            {/* Payment Method Selector */}
            <div className={`space-y-3 pt-2 border-t ${isLight ? 'border-[#eee7db]' : 'border-[#292019]'}`}>
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-wider font-bold">
                  {t.securePaymentMethod}
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t.encryptedConnection}</span>
                </div>
              </div>

              {/* Payment Method Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'credit_card'
                      ? 'border-[#b58548] bg-[#b58548]/10 font-bold'
                      : isLight ? 'border-[#ded7ca] bg-[#faf8f5]' : 'border-[#30261e] bg-[#1a1613]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#b58548]" />
                  <span>{t.payCard}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('yappy_ach')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'yappy_ach'
                      ? 'border-[#009bda] bg-[#009bda]/10 font-bold text-[#009bda]'
                      : isLight ? 'border-[#ded7ca] bg-[#faf8f5]' : 'border-[#30261e] bg-[#1a1613]'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-[#009bda]" />
                  <span>{t.payYappy}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'apple_pay'
                      ? 'border-[#b58548] bg-[#b58548]/10 font-bold'
                      : isLight ? 'border-[#ded7ca] bg-[#faf8f5]' : 'border-[#30261e] bg-[#1a1613]'
                  }`}
                >
                  <span className="font-bold text-sm"> / GPay</span>
                  <span>{t.payExpress}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash_counter')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'cash_counter'
                      ? 'border-[#b58548] bg-[#b58548]/10 font-bold'
                      : isLight ? 'border-[#ded7ca] bg-[#faf8f5]' : 'border-[#30261e] bg-[#1a1613]'
                  }`}
                >
                  <DollarSign className="w-4 h-4 text-[#b58548]" />
                  <span>{t.payCash}</span>
                </button>
              </div>

              {/* Specific Details */}
              {paymentMethod === 'credit_card' && (
                <div className={`p-4 rounded-xl border space-y-3 ${
                  isLight ? 'bg-[#faf8f5] border-[#ded7ca]' : 'bg-[#1a1512] border-[#33281f]'
                }`}>
                  <div className="flex items-center justify-between text-[11px] opacity-75">
                    <span>Visa, Mastercard, AMEX</span>
                    <span className="font-mono text-[10px] bg-[#b58548]/20 px-2 py-0.5 rounded text-[#b58548] font-bold">256-bit SSL</span>
                  </div>

                  <div>
                    <label className="block text-[11px] mb-1 opacity-80">{t.cardNameLabel}</label>
                    <input
                      type="text"
                      placeholder="Roberto De Gracia"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className={`w-full border rounded-lg px-3 py-2 text-xs uppercase focus:outline-none focus:border-[#b58548] ${
                        isLight ? 'bg-white border-[#ded7ca]' : 'bg-[#13100e] border-[#33281f] text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] mb-1 opacity-80">{t.cardNumberLabel}</label>
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      value={cardNumber}
                      onChange={(e) => handleCardNumberChange(e.target.value)}
                      className={`w-full border rounded-lg px-3 py-2 text-xs font-mono tracking-wider focus:outline-none focus:border-[#b58548] ${
                        isLight ? 'bg-white border-[#ded7ca]' : 'bg-[#13100e] border-[#33281f] text-white'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] mb-1 opacity-80">{t.cardExpiryLabel}</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        value={cardExpiry}
                        onChange={(e) => handleExpiryChange(e.target.value)}
                        className={`w-full border rounded-lg px-3 py-2 text-xs font-mono text-center focus:outline-none focus:border-[#b58548] ${
                          isLight ? 'bg-white border-[#ded7ca]' : 'bg-[#13100e] border-[#33281f] text-white'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] mb-1 opacity-80">{t.cardCvvLabel}</label>
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        className={`w-full border rounded-lg px-3 py-2 text-xs font-mono text-center focus:outline-none focus:border-[#b58548] ${
                          isLight ? 'bg-white border-[#ded7ca]' : 'bg-[#13100e] border-[#33281f] text-white'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'yappy_ach' && (
                <div className={`p-4 rounded-xl border space-y-3 ${
                  isLight ? 'bg-[#f0f9fd] border-[#bce3f5]' : 'bg-[#0a1820] border-[#163f52]'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#009bda]/20 flex items-center justify-center text-[#009bda] border border-[#009bda]/30">
                      <QrCode className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">{t.yappyVerified}</div>
                      <div className="font-mono text-xs text-[#009bda] font-bold">@cabreracoffee</div>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed opacity-80">
                    {t.yappyInstruction} (${total.toFixed(2)})
                  </p>

                  <div>
                    <label className="block text-[11px] mb-1 opacity-80">{t.yourYappyPhone}</label>
                    <input
                      type="tel"
                      placeholder="6000-0000"
                      value={yappyPhone}
                      onChange={(e) => setYappyPhone(e.target.value)}
                      className={`w-full border rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#009bda] ${
                        isLight ? 'bg-white border-[#bce3f5]' : 'bg-[#051016] border-[#184357] text-white'
                      }`}
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'apple_pay' && (
                <div className={`p-4 rounded-xl border text-center space-y-2 ${
                  isLight ? 'bg-[#faf8f5] border-[#ded7ca]' : 'bg-[#1a1613] border-[#382d23]'
                }`}>
                  <span className="text-2xl"></span>
                  <div className="text-xs font-bold">{t.expressPayTitle}</div>
                  <p className="text-xs opacity-75">{t.expressPayDesc}</p>
                </div>
              )}

              {paymentMethod === 'cash_counter' && (
                <div className={`p-4 rounded-xl border space-y-2 text-xs leading-relaxed ${
                  isLight ? 'bg-[#faf8f5] border-[#ded7ca]' : 'bg-[#1a1613] border-[#382d23]'
                }`}>
                  <p>{orderType === 'dine_in' ? t.cashDineInNotice : t.cashTakeoutNotice}</p>
                </div>
              )}
            </div>

            {/* Total preview */}
            <div className={`p-4 rounded-xl border flex items-center justify-between ${
              isLight ? 'bg-[#fcfbf9] border-[#ded7ca]' : 'bg-[#120f0d] border-[#2b221a]'
            }`}>
              <div>
                <span className="text-xs font-medium block">{t.totalDefinitive}</span>
                <span className="text-[11px] opacity-70">{t.includesTaxTip}</span>
              </div>
              <span className="font-mono text-xl font-bold text-[#b58548]">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#b58548] hover:bg-[#9c6e33] disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{processingStep}</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>{t.authorizePayment} (${total.toFixed(2)})</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
