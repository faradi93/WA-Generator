import React, { useState, useRef, useEffect } from 'react';
import {
  Copy, Download, QrCode, Link as LinkIcon,
  Code, CheckCircle2, RotateCcw, X,
} from 'lucide-react';

const COUNTRIES = [
  { name: 'Indonesia',             dial_code: '62',  flag: '🇮🇩' },
  { name: 'Malaysia',              dial_code: '60',  flag: '🇲🇾' },
  { name: 'Singapore',             dial_code: '65',  flag: '🇸🇬' },
  { name: 'Brunei',                dial_code: '673', flag: '🇧🇳' },
  { name: 'Thailand',              dial_code: '66',  flag: '🇹🇭' },
  { name: 'Philippines',           dial_code: '63',  flag: '🇵🇭' },
  { name: 'Vietnam',               dial_code: '84',  flag: '🇻🇳' },
  { name: 'United States',         dial_code: '1',   flag: '🇺🇸' },
  { name: 'United Kingdom',        dial_code: '44',  flag: '🇬🇧' },
  { name: 'Afghanistan', dial_code: '93', flag: '🇦🇫' },
  { name: 'Albania', dial_code: '355', flag: '🇦🇱' },
  { name: 'Algeria', dial_code: '213', flag: '🇩🇿' },
  { name: 'Andorra', dial_code: '376', flag: '🇦🇩' },
  { name: 'Angola', dial_code: '244', flag: '🇦🇴' },
  { name: 'Argentina', dial_code: '54', flag: '🇦🇷' },
  { name: 'Armenia', dial_code: '374', flag: '🇦🇲' },
  { name: 'Australia', dial_code: '61', flag: '🇦🇺' },
  { name: 'Austria', dial_code: '43', flag: '🇦🇹' },
  { name: 'Azerbaijan', dial_code: '994', flag: '🇦🇿' },
  { name: 'Bahamas', dial_code: '1242', flag: '🇧🇸' },
  { name: 'Bahrain', dial_code: '973', flag: '🇧🇭' },
  { name: 'Bangladesh', dial_code: '880', flag: '🇧🇩' },
  { name: 'Barbados', dial_code: '1246', flag: '🇧🇧' },
  { name: 'Belarus', dial_code: '375', flag: '🇧🇾' },
  { name: 'Belgium', dial_code: '32', flag: '🇧🇪' },
  { name: 'Belize', dial_code: '501', flag: '🇧🇿' },
  { name: 'Benin', dial_code: '229', flag: '🇧🇯' },
  { name: 'Bhutan', dial_code: '975', flag: '🇧🇹' },
  { name: 'Bolivia', dial_code: '591', flag: '🇧🇴' },
  { name: 'Bosnia and Herzegovina', dial_code: '387', flag: '🇧🇦' },
  { name: 'Botswana', dial_code: '267', flag: '🇧🇼' },
  { name: 'Brazil', dial_code: '55', flag: '🇧🇷' },
  { name: 'Bulgaria', dial_code: '359', flag: '🇧🇬' },
  { name: 'Burkina Faso', dial_code: '226', flag: '🇧🇫' },
  { name: 'Burundi', dial_code: '257', flag: '🇧🇮' },
  { name: 'Cambodia', dial_code: '855', flag: '🇰🇭' },
  { name: 'Cameroon', dial_code: '237', flag: '🇨🇲' },
  { name: 'Canada', dial_code: '1', flag: '🇨🇦' },
  { name: 'Cape Verde', dial_code: '238', flag: '🇨🇻' },
  { name: 'Central African Republic', dial_code: '236', flag: '🇨🇫' },
  { name: 'Chad', dial_code: '235', flag: '🇹🇩' },
  { name: 'Chile', dial_code: '56', flag: '🇨🇱' },
  { name: 'China', dial_code: '86', flag: '🇨🇳' },
  { name: 'Colombia', dial_code: '57', flag: '🇨🇴' },
  { name: 'Comoros', dial_code: '269', flag: '🇰🇲' },
  { name: 'Congo', dial_code: '242', flag: '🇨🇬' },
  { name: 'Costa Rica', dial_code: '506', flag: '🇨🇷' },
  { name: 'Croatia', dial_code: '385', flag: '🇭🇷' },
  { name: 'Cuba', dial_code: '53', flag: '🇨🇺' },
  { name: 'Cyprus', dial_code: '357', flag: '🇨🇾' },
  { name: 'Czech Republic', dial_code: '420', flag: '🇨🇿' },
  { name: 'Denmark', dial_code: '45', flag: '🇩🇰' },
  { name: 'Djibouti', dial_code: '253', flag: '🇩🇯' },
  { name: 'Dominica', dial_code: '1767', flag: '🇩🇲' },
  { name: 'Dominican Republic', dial_code: '1809', flag: '🇩🇴' },
  { name: 'Ecuador', dial_code: '593', flag: '🇪🇨' },
  { name: 'Egypt', dial_code: '20', flag: '🇪🇬' },
  { name: 'El Salvador', dial_code: '503', flag: '🇸🇻' },
  { name: 'Equatorial Guinea', dial_code: '240', flag: '🇬🇶' },
  { name: 'Eritrea', dial_code: '291', flag: '🇪🇷' },
  { name: 'Estonia', dial_code: '372', flag: '🇪🇪' },
  { name: 'Ethiopia', dial_code: '251', flag: '🇪🇹' },
  { name: 'Fiji', dial_code: '679', flag: '🇫🇯' },
  { name: 'Finland', dial_code: '358', flag: '🇫🇮' },
  { name: 'France', dial_code: '33', flag: '🇫🇷' },
  { name: 'Gabon', dial_code: '241', flag: '🇬🇦' },
  { name: 'Gambia', dial_code: '220', flag: '🇬🇲' },
  { name: 'Georgia', dial_code: '995', flag: '🇬🇪' },
  { name: 'Germany', dial_code: '49', flag: '🇩🇪' },
  { name: 'Ghana', dial_code: '233', flag: '🇬🇭' },
  { name: 'Greece', dial_code: '30', flag: '🇬🇷' },
  { name: 'Grenada', dial_code: '1473', flag: '🇬🇩' },
  { name: 'Guatemala', dial_code: '502', flag: '🇬🇹' },
  { name: 'Guinea', dial_code: '224', flag: '🇬🇳' },
  { name: 'Guyana', dial_code: '592', flag: '🇬🇾' },
  { name: 'Haiti', dial_code: '509', flag: '🇭🇹' },
  { name: 'Honduras', dial_code: '504', flag: '🇭🇳' },
  { name: 'Hungary', dial_code: '36', flag: '🇭🇺' },
  { name: 'Iceland', dial_code: '354', flag: '🇮🇸' },
  { name: 'India', dial_code: '91', flag: '🇮🇳' },
  { name: 'Iran', dial_code: '98', flag: '🇮🇷' },
  { name: 'Iraq', dial_code: '964', flag: '🇮🇶' },
  { name: 'Ireland', dial_code: '353', flag: '🇮🇪' },
  { name: 'Israel', dial_code: '972', flag: '🇮🇱' },
  { name: 'Italy', dial_code: '39', flag: '🇮🇹' },
  { name: 'Jamaica', dial_code: '1876', flag: '🇯🇲' },
  { name: 'Japan', dial_code: '81', flag: '🇯🇵' },
  { name: 'Jordan', dial_code: '962', flag: '🇯🇴' },
  { name: 'Kazakhstan', dial_code: '7', flag: '🇰🇿' },
  { name: 'Kenya', dial_code: '254', flag: '🇰🇪' },
  { name: 'Kiribati', dial_code: '686', flag: '🇰🇮' },
  { name: 'Kuwait', dial_code: '965', flag: '🇰🇼' },
  { name: 'Kyrgyzstan', dial_code: '996', flag: '🇰🇬' },
  { name: 'Laos', dial_code: '856', flag: '🇱🇦' },
  { name: 'Latvia', dial_code: '371', flag: '🇱🇻' },
  { name: 'Lebanon', dial_code: '961', flag: '🇱🇧' },
  { name: 'Lesotho', dial_code: '266', flag: '🇱🇸' },
  { name: 'Liberia', dial_code: '231', flag: '🇱🇷' },
  { name: 'Libya', dial_code: '218', flag: '🇱🇾' },
  { name: 'Liechtenstein', dial_code: '423', flag: '🇱🇮' },
  { name: 'Lithuania', dial_code: '370', flag: '🇱🇹' },
  { name: 'Luxembourg', dial_code: '352', flag: '🇱🇺' },
  { name: 'Madagascar', dial_code: '261', flag: '🇲🇬' },
  { name: 'Malawi', dial_code: '265', flag: '🇲🇼' },
  { name: 'Maldives', dial_code: '960', flag: '🇲🇻' },
  { name: 'Mali', dial_code: '223', flag: '🇲🇱' },
  { name: 'Malta', dial_code: '356', flag: '🇲🇹' },
  { name: 'Mauritania', dial_code: '222', flag: '🇲🇷' },
  { name: 'Mauritius', dial_code: '230', flag: '🇲🇺' },
  { name: 'Mexico', dial_code: '52', flag: '🇲🇽' },
  { name: 'Monaco', dial_code: '377', flag: '🇲🇨' },
  { name: 'Mongolia', dial_code: '976', flag: '🇲🇳' },
  { name: 'Montenegro', dial_code: '382', flag: '🇲🇪' },
  { name: 'Morocco', dial_code: '212', flag: '🇲🇦' },
  { name: 'Mozambique', dial_code: '258', flag: '🇲🇿' },
  { name: 'Myanmar', dial_code: '95', flag: '🇲🇲' },
  { name: 'Namibia', dial_code: '264', flag: '🇳🇦' },
  { name: 'Nauru', dial_code: '674', flag: '🇳🇷' },
  { name: 'Nepal', dial_code: '977', flag: '🇳🇵' },
  { name: 'Netherlands', dial_code: '31', flag: '🇳🇱' },
  { name: 'New Zealand', dial_code: '64', flag: '🇳🇿' },
  { name: 'Nicaragua', dial_code: '505', flag: '🇳🇮' },
  { name: 'Niger', dial_code: '227', flag: '🇳🇪' },
  { name: 'Nigeria', dial_code: '234', flag: '🇳🇬' },
  { name: 'North Korea', dial_code: '850', flag: '🇰🇵' },
  { name: 'Norway', dial_code: '47', flag: '🇳🇴' },
  { name: 'Oman', dial_code: '968', flag: '🇴🇲' },
  { name: 'Pakistan', dial_code: '92', flag: '🇵🇰' },
  { name: 'Palau', dial_code: '680', flag: '🇵🇼' },
  { name: 'Panama', dial_code: '507', flag: '🇵🇦' },
  { name: 'Papua New Guinea', dial_code: '675', flag: '🇵🇬' },
  { name: 'Paraguay', dial_code: '595', flag: '🇵🇾' },
  { name: 'Peru', dial_code: '51', flag: '🇵🇪' },
  { name: 'Poland', dial_code: '48', flag: '🇵🇱' },
  { name: 'Portugal', dial_code: '351', flag: '🇵🇹' },
  { name: 'Qatar', dial_code: '974', flag: '🇶🇦' },
  { name: 'Romania', dial_code: '40', flag: '🇷🇴' },
  { name: 'Russia', dial_code: '7', flag: '🇷🇺' },
  { name: 'Rwanda', dial_code: '250', flag: '🇷🇼' },
  { name: 'Samoa', dial_code: '685', flag: '🇼🇸' },
  { name: 'San Marino', dial_code: '378', flag: '🇸🇲' },
  { name: 'Saudi Arabia', dial_code: '966', flag: '🇸🇦' },
  { name: 'Senegal', dial_code: '221', flag: '🇸🇳' },
  { name: 'Serbia', dial_code: '381', flag: '🇷🇸' },
  { name: 'Seychelles', dial_code: '248', flag: '🇸🇨' },
  { name: 'Sierra Leone', dial_code: '232', flag: '🇸🇱' },
  { name: 'Slovakia', dial_code: '421', flag: '🇸🇰' },
  { name: 'Slovenia', dial_code: '386', flag: '🇸🇮' },
  { name: 'Somalia', dial_code: '252', flag: '🇸🇴' },
  { name: 'South Africa', dial_code: '27', flag: '🇿🇦' },
  { name: 'South Korea', dial_code: '82', flag: '🇰🇷' },
  { name: 'Spain', dial_code: '34', flag: '🇪🇸' },
  { name: 'Sri Lanka', dial_code: '94', flag: '🇱🇰' },
  { name: 'Sudan', dial_code: '249', flag: '🇸🇩' },
  { name: 'Suriname', dial_code: '597', flag: '🇸🇷' },
  { name: 'Swaziland', dial_code: '268', flag: '🇸🇿' },
  { name: 'Sweden', dial_code: '46', flag: '🇸🇪' },
  { name: 'Switzerland', dial_code: '41', flag: '🇨🇭' },
  { name: 'Syria', dial_code: '963', flag: '🇸🇾' },
  { name: 'Taiwan', dial_code: '886', flag: '🇹🇼' },
  { name: 'Tajikistan', dial_code: '992', flag: '🇹🇯' },
  { name: 'Tanzania', dial_code: '255', flag: '🇹🇿' },
  { name: 'Togo', dial_code: '228', flag: '🇹🇬' },
  { name: 'Tonga', dial_code: '676', flag: '🇹🇴' },
  { name: 'Trinidad and Tobago', dial_code: '1868', flag: '🇹🇹' },
  { name: 'Tunisia', dial_code: '216', flag: '🇹🇳' },
  { name: 'Turkey', dial_code: '90', flag: '🇹🇷' },
  { name: 'Turkmenistan', dial_code: '993', flag: '🇹🇲' },
  { name: 'Uganda', dial_code: '256', flag: '🇺🇬' },
  { name: 'Ukraine', dial_code: '380', flag: '🇺🇦' },
  { name: 'United Arab Emirates', dial_code: '971', flag: '🇦🇪' },
  { name: 'Uruguay', dial_code: '598', flag: '🇺🇾' },
  { name: 'Uzbekistan', dial_code: '998', flag: '🇺🇿' },
  { name: 'Vanuatu', dial_code: '678', flag: '🇻🇺' },
  { name: 'Vatican City', dial_code: '379', flag: '🇻🇦' },
  { name: 'Venezuela', dial_code: '58', flag: '🇻🇪' },
  { name: 'Yemen', dial_code: '967', flag: '🇾🇪' },
  { name: 'Zambia', dial_code: '260', flag: '🇿🇲' },
  { name: 'Zimbabwe', dial_code: '263', flag: '🇿🇼' }
];

const escapeHtml = (text) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const parseWhatsAppFormatting = (text) => {
  if (!text) {
    return <span className="text-slate-400 italic">Ketik pesan Anda di sini...</span>;
  }
  const html = escapeHtml(text)
    .replace(/\*(.*?)\*/g,  '<strong>$1</strong>')
    .replace(/_(.*?)_/g,    '<em>$1</em>')
    .replace(/~(.*?)~/g,    '<del>$1</del>')
    .replace(/\n/g,         '<br />');
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

const WhatsAppIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default function App() {
  const [selectedCountryName, setSelectedCountryName] = useState('Indonesia');
  const [phoneNumber, setPhoneNumber]   = useState('');
  const [message, setMessage]           = useState('');
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultTab, setResultTab]       = useState('link');
  const [copiedId, setCopiedId]         = useState(null);

  const textareaRef = useRef(null);

  const selectedCountry = COUNTRIES.find((c) => c.name === selectedCountryName) || COUNTRIES[0];
  const countryCode     = selectedCountry.dial_code;

  const generatedLink = `https://wa.me/${countryCode}${phoneNumber}?text=${encodeURIComponent(message)}`;
  const htmlCode      = `<a href="${generatedLink}" target="_blank" rel="noopener noreferrer">Hubungi Kami via WhatsApp</a>`;
  const qrCodeUrl     = `https://quickchart.io/qr?text=${encodeURIComponent(generatedLink)}&size=300&margin=1`;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleFormat = (type) => {
    if (!textareaRef.current) return;
    const start        = textareaRef.current.selectionStart;
    const end          = textareaRef.current.selectionEnd;
    const selectedText = message.substring(start, end);
    const wrappers     = { bold: '*', italic: '_', strike: '~' };
    const wrapper      = wrappers[type];
    if (!wrapper) return;

    setMessage(message.substring(0, start) + wrapper + selectedText + wrapper + message.substring(end));

    setTimeout(() => {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(start + 1, end + 1);
    }, 0);
  };

  const handleGenerate = () => {
    if (!phoneNumber) {
      alert('Harap masukkan nomor handphone terlebih dahulu.');
      return;
    }
    setShowResultModal(true);
    setResultTab('link');
    setCopiedId(null);
  };

  const handleReset = () => {
    setPhoneNumber('');
    setMessage('');
    setSelectedCountryName('Indonesia');
  };

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      el.style.cssText = 'position:absolute;left:-9999px;top:-9999px';
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand('copy');
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      } finally {
        el.remove();
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-slate-50 font-sans relative w-full">
      {showResultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowResultModal(false)} />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">Tautan Anda Siap!</h3>
              <button onClick={() => setShowResultModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-2 rounded-full hover:bg-slate-100"><X size={24} /></button>
            </div>
            <div className="flex border-b border-slate-100">
              {(['link', 'qrcode', 'html']).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setResultTab(tab)}
                  className={`flex-1 py-4 text-sm font-semibold tracking-wide uppercase transition-colors flex justify-center items-center gap-2 ${resultTab === tab ? 'text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                >
                  {tab === 'link'   && <LinkIcon size={16} />}
                  {tab === 'qrcode' && <QrCode   size={16} />}
                  {tab === 'html'   && <Code      size={16} />}
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-8 flex flex-col items-center justify-center min-h-[250px] bg-slate-50/50">
              {resultTab === 'link' && (
                <div className="w-full">
                  <p className="text-sm text-slate-500 mb-3 font-medium">Tautan WhatsApp Langsung (Tanpa Iklan)</p>
                  <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm transition-all">
                    <input type="text" readOnly value={generatedLink} className="flex-1 p-4 text-sm text-slate-700 outline-none w-full" />
                    <button onClick={() => copyToClipboard(generatedLink, 'link')} className="bg-emerald-500 text-white px-6 font-semibold text-sm hover:bg-emerald-600 transition-colors flex items-center gap-2 m-1 rounded-md">
                      {copiedId === 'link' ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                      {copiedId === 'link' ? 'Tersalin' : 'Salin'}
                    </button>
                  </div>
                </div>
              )}
              {resultTab === 'qrcode' && (
                <div className="flex flex-col items-center gap-6">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100"><img src={qrCodeUrl} alt="WhatsApp QR Code" className="w-44 h-44" /></div>
                  <a href={qrCodeUrl} download="wa-qr-code.png" target="_blank" rel="noopener noreferrer" className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold text-sm hover:bg-emerald-600 transition-colors flex items-center gap-2 shadow-md shadow-emerald-500/20"><Download size={18} /> Simpan QR Code</a>
                </div>
              )}
              {resultTab === 'html' && (
                <div className="w-full">
                  <p className="text-sm text-slate-500 mb-3 font-medium">Sematkan di website Anda</p>
                  <div className="flex flex-col bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                    <textarea readOnly value={htmlCode} className="w-full p-4 text-sm text-slate-700 outline-none font-mono resize-none h-24" />
                    <div className="bg-slate-50 p-2 border-t border-slate-100 flex justify-end">
                      <button onClick={() => copyToClipboard(htmlCode, 'html')} className="bg-slate-800 text-white px-6 py-2.5 rounded-md font-semibold text-sm hover:bg-slate-900 transition-colors flex items-center gap-2 whitespace-nowrap">
                        {copiedId === 'html' ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                        {copiedId === 'html' ? 'Tersalin' : 'Salin HTML'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DIUBAH: Memisahkan padding atas agar tidak tertimpa oleh p-12 atau p-16 di layar besar */}
      <div className="w-full lg:w-1/2 px-6 pb-6 pt-4 md:px-12 md:pb-12 md:pt-6 lg:px-14 lg:pb-16 lg:pt-8 flex flex-col xl:pr-8">
        <div className="max-w-xl mx-auto lg:mx-0 w-full lg:ml-auto">
          <div className="mb-10">
            <h1 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-slate-900 mb-4 flex items-center gap-3">
              <WhatsAppIcon className="w-9 h-9 sm:w-10 sm:h-10 text-emerald-500 shrink-0" />
              <span className="leading-tight">Free WhatsApp <span className="whitespace-nowrap">link generator</span></span>
            </h1>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              Untuk membuat Link WhatsApp Anda, tambahkan nomor Anda dan masukkan pesan yang sudah terisi sebelumnya yang dapat dikirim pengunjung Anda hanya dengan satu ketukan.
            </p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nomor WhatsApp</label>
              <div className="flex border border-slate-300 rounded-xl transition-all bg-white overflow-hidden">
                <select value={selectedCountryName} onChange={(e) => setSelectedCountryName(e.target.value)} className="bg-slate-50 border-none py-3.5 pl-4 pr-8 text-slate-700 outline-none cursor-pointer border-r border-slate-300 appearance-none font-semibold w-[120px] shrink-0" style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23475569' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', }}>
                  {COUNTRIES.map((country) => (<option key={country.name} value={country.name}>{country.flag} +{country.dial_code}</option>))}
                </select>
                <input type="tel" placeholder="89655395388" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))} className="flex-1 py-3.5 px-4 outline-none text-slate-800 w-full placeholder-slate-400 font-medium" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Pesan Kustom</label>
              <div className="border border-slate-300 rounded-xl transition-all bg-white flex flex-col overflow-hidden shadow-sm">
                <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border-b border-slate-200">
                  <button onClick={() => handleFormat('bold')} title="Tebal (*teks*)" className="w-8 h-8 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-200 hover:text-slate-900 rounded transition-colors">B</button>
                  <button onClick={() => handleFormat('italic')} title="Miring (_teks_)" className="w-8 h-8 flex items-center justify-center italic font-serif text-slate-600 hover:bg-slate-200 hover:text-slate-900 rounded transition-colors">I</button>
                  <button onClick={() => handleFormat('strike')} title="Coret (~teks~)" className="w-8 h-8 flex items-center justify-center line-through text-slate-600 hover:bg-slate-200 hover:text-slate-900 rounded transition-colors">S</button>
                </div>
                <textarea ref={textareaRef} placeholder="Halo, saya ingin bertanya tentang layanan Anda..." value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-4 outline-none text-slate-800 placeholder-slate-400 resize-none min-h-[120px]" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-4">
              <button onClick={handleReset} className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"><RotateCcw size={16} /> Reset</button>
              <button onClick={handleGenerate} className="w-full sm:w-auto bg-emerald-500 text-white px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide hover:bg-emerald-600 hover:-translate-y-0.5 transition-all shadow-lg shadow-emerald-500/30">Generate Link</button>
            </div>
          </div>
          <div className="pt-8 text-sm font-semibold text-slate-400 text-center lg:text-left">Powered by <a href="https://apookat.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">apookat.com</a></div>
        </div>
      </div>
      
      {/* DIUBAH: Memisahkan padding atas agar sejajar dengan bagian kiri */}
      <div className="w-full lg:w-1/2 px-6 pb-6 pt-4 md:px-12 md:pb-12 md:pt-6 lg:px-16 lg:pb-16 lg:pt-8 flex flex-col items-center relative xl:pl-8">
        <div className="absolute inset-0 z-0 overflow-hidden hidden lg:block">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-100/50 blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-100/50 blur-3xl" />
        </div>
        <div className="w-[320px] h-[640px] bg-slate-900 rounded-[3rem] shadow-2xl p-3 relative z-10 border-[6px] border-slate-800 mt-4">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-full z-30" />
          <div className="w-full h-full bg-[#efeae2] rounded-[2.5rem] overflow-hidden flex flex-col relative">
            <div className="bg-[#00a884] text-white p-4 pt-12 flex items-center gap-3 shadow-sm z-20 relative">
              <div className="w-10 h-10 bg-slate-200/20 rounded-full flex items-center justify-center overflow-hidden shrink-0"><WhatsAppIcon className="w-6 h-6 text-white" /></div>
              <div className="flex-1 min-w-0"><div className="font-semibold text-sm truncate">{phoneNumber ? `+${countryCode} ${phoneNumber}` : 'Nomor Tujuan'}</div></div>
            </div>
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 2h4v4H2V2zm4 4h4v4H6V6zm4 4h4v4h-4v-4zm4 4h4v4h-4v-4z' fill='%23000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`, backgroundSize: '40px', }} />
            <div className="flex-1 p-4 flex flex-col justify-end overflow-y-auto relative z-10 pb-6">
              <div className="flex justify-center mb-4"><span className="bg-white/80 backdrop-blur-sm text-slate-500 text-[11px] px-3 py-1 rounded-lg shadow-sm">Hari Ini</span></div>
              <div className="bg-[#dcf8c6] self-end max-w-[85%] rounded-2xl rounded-tr-none p-2.5 shadow-sm text-sm text-slate-800 relative">
                <span className="absolute top-0 right-[-6px] text-[#dcf8c6]"><svg width="8" height="12" viewBox="0 0 8 12" fill="currentColor"><path d="M0 0H8L0 12V0Z" /></svg></span>
                <div className="pr-12 break-words text-[15px] leading-relaxed">{parseWhatsAppFormatting(message)}</div>
                <div className="absolute bottom-1 right-2 text-[10px] text-emerald-700/60 flex items-center gap-1 font-medium">{new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}<svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}