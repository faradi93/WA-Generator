import React, { useState, useRef, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Copy, Download, QrCode, Link as LinkIcon, Code, CheckCircle2, RotateCcw, X, Loader2 } from 'lucide-react';

// --- KONFIGURASI SUPABASE ---
const supabaseUrl = 'https://sehbzyxpuwvfwurkczko.supabase.co/rest/v1/';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlaGJ6eXhwdXd2Znd1cmtjemtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0MTYzNjgsImV4cCI6MjA5NDk5MjM2OH0.Qt45JUP90MKV7zdbiYdB0PlHaw1X_tsKN8axCIjCHZU';
const supabase = createClient(supabaseUrl, supabaseKey);

// --- KONFIGURASI DOMAIN ANDA ---
// Ganti dengan domain yang akan Anda gunakan (misal: wa.apookat.com)
// Jika masih pakai netlify, biarkan pakai origin saat ini
const DOMAIN_URL = window.location.origin;

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


export default function App() {
  const [isRedirecting, setIsRedirecting] = useState(true);
  const [redirectError, setRedirectError] = useState(false);

  const [selectedCountryName, setSelectedCountryName] = useState('Indonesia');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultTab, setResultTab] = useState('link');
  const [copiedId, setCopiedId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [generatedShortLink, setGeneratedShortLink] = useState('');

  const textareaRef = useRef(null);
  const selectedCountry = COUNTRIES.find((c) => c.name === selectedCountryName) || COUNTRIES[0];
  const countryCode = selectedCountry.dial_code;

  // URL untuk fitur Embed/QR Code (menggunakan link pendek, bukan wa.me langsung)
  const htmlCode = `<a href="${generatedShortLink}" target="_blank" rel="noopener noreferrer">Hubungi Kami via WhatsApp</a>`;
  const qrCodeUrl = `https://quickchart.io/qr?text=${encodeURIComponent(generatedShortLink)}&size=300&margin=1`;

  // --- LOGIKA REDIRECT PENGUNJUNG ---
  useEffect(() => {
    const checkAndRedirect = async () => {
      // Mengambil kode dari URL (misal apookat.com/abcde -> dapat 'abcde')
      const pathCode = window.location.pathname.replace('/', '');
      
      if (pathCode && pathCode.length > 0) {
        try {
          // Cari di database
          const { data, error } = await supabase
            .from('links')
            .select('*')
            .eq('short_code', pathCode)
            .single();

          if (data) {
            // Tambahkan klik +1 secara diam-diam
            await supabase
              .from('links')
              .update({ clicks: data.clicks + 1 })
              .eq('id', data.id);

            // Arahkan pengunjung ke WhatsApp tujuan
            const waLink = `https://wa.me/${data.phone_number}?text=${encodeURIComponent(data.message || '')}`;
            window.location.replace(waLink);
          } else {
            // Jika kode tidak ditemukan, stop loading
            setRedirectError(true);
            setIsRedirecting(false);
          }
        } catch (err) {
          console.error('Error fetching link:', err);
          setRedirectError(true);
          setIsRedirecting(false);
        }
      } else {
        // Jika tidak ada kode di URL, berarti ini admin yang mau bikin link (tampilkan form)
        setIsRedirecting(false);
      }
    };

    checkAndRedirect();
  }, []);

  // --- LOGIKA PEMBUATAN LINK BARU ---
  const handleGenerate = async () => {
    if (!phoneNumber) {
      alert('Harap masukkan nomor handphone terlebih dahulu.');
      return;
    }

    setIsGenerating(true);

    // Buat 6 digit kode acak
    const randomCode = Math.random().toString(36).substring(2, 8);
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    try {
      // Simpan ke database
      const { error } = await supabase
        .from('links')
        .insert([
          { 
            short_code: randomCode, 
            phone_number: fullPhoneNumber, 
            message: message 
          }
        ]);

      if (error) throw error;

      // Sukses! Buat link tampilannya
      setGeneratedShortLink(`${DOMAIN_URL}/${randomCode}`);
      setShowResultModal(true);
      setResultTab('link');
      setCopiedId(null);
      
    } catch (error) {
      console.error('Gagal membuat link:', error);
      alert('Terjadi kesalahan saat membuat link. Silakan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
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
      // Fallback
    }
  };

  // TAMPILAN LOADING SAAT REDIRECT KE WHATSAPP
  if (isRedirecting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-bold text-slate-800">Mengarahkan ke WhatsApp...</h2>
        <p className="text-slate-500 mt-2">Mohon tunggu sebentar.</p>
      </div>
    );
  }

  // TAMPILAN FORM UTAMA (Untuk Admin / Pembuat Link)
  return (
    <div className="flex flex-col lg:flex-row bg-slate-50 font-sans relative w-full min-h-screen">
      
      {redirectError && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-center py-2 z-50">
          Link WhatsApp tidak ditemukan atau sudah tidak aktif.
        </div>
      )}

      {/* --- MODAL HASIL --- */}
      {showResultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowResultModal(false)} />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">Tautan Trackable Anda Siap!</h3>
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
                  <p className="text-sm text-slate-500 mb-3 font-medium">Link Pendek (Klik otomatis terhitung)</p>
                  <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm transition-all">
                    <input type="text" readOnly value={generatedShortLink} className="flex-1 p-4 text-sm text-slate-700 outline-none w-full" />
                    <button onClick={() => copyToClipboard(generatedShortLink, 'link')} className="bg-emerald-500 text-white px-6 font-semibold text-sm hover:bg-emerald-600 transition-colors flex items-center gap-2 m-1 rounded-md">
                      {copiedId === 'link' ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                      {copiedId === 'link' ? 'Tersalin' : 'Salin'}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-4 text-center">Gunakan link ini di bio Instagram/TikTok Anda untuk melacak klik.</p>
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

      {/* --- FORM KIRI --- */}
      <div className="w-full lg:w-1/2 px-6 pb-6 pt-4 md:px-12 md:pb-12 md:pt-6 lg:px-16 lg:pb-16 lg:pt-8 flex flex-col xl:pr-8">
        <div className="max-w-xl mx-auto lg:mx-0 w-full lg:ml-auto">
          <div className="mb-10">
            <h1 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-slate-900 mb-4 flex items-center gap-3">
              <span className="leading-tight">Trackable WA <span className="whitespace-nowrap">Link Generator</span></span>
            </h1>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              Buat link WhatsApp yang otomatis melacak jumlah klik. Cocok untuk bio Instagram dan kebutuhan Digital Marketing.
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
                <textarea ref={textareaRef} placeholder="Halo, saya ingin bertanya tentang layanan Anda..." value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-4 outline-none text-slate-800 placeholder-slate-400 resize-none min-h-[120px]" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-4">
              <button onClick={handleReset} className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"><RotateCcw size={16} /> Reset</button>
              <button onClick={handleGenerate} disabled={isGenerating} className="w-full sm:w-auto bg-emerald-500 text-white px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide hover:bg-emerald-600 disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2">
                {isGenerating ? <Loader2 size={18} className="animate-spin" /> : null}
                {isGenerating ? 'Menyimpan...' : 'Generate Short Link'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* --- MOCKUP HP KANAN --- */}
      <div className="w-full lg:w-1/2 px-6 pb-6 pt-4 md:px-12 md:pb-12 md:pt-6 lg:px-16 lg:pb-16 lg:pt-8 flex flex-col items-center relative xl:pl-8">
        <div className="w-[320px] h-[640px] bg-slate-900 rounded-[3rem] shadow-2xl p-3 relative z-10 border-[6px] border-slate-800 mt-4">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-full z-30" />
          <div className="w-full h-full bg-[#efeae2] rounded-[2.5rem] overflow-hidden flex flex-col relative">
            <div className="bg-[#00a884] text-white p-4 pt-12 flex items-center gap-3 shadow-sm z-20 relative">
              <div className="flex-1 min-w-0"><div className="font-semibold text-sm truncate">{phoneNumber ? `+${countryCode} ${phoneNumber}` : 'Preview WhatsApp'}</div></div>
            </div>
            <div className="flex-1 p-4 flex flex-col justify-end overflow-y-auto relative z-10 pb-6">
              <div className="bg-[#dcf8c6] self-end max-w-[85%] rounded-2xl rounded-tr-none p-2.5 shadow-sm text-sm text-slate-800 relative">
                <div className="pr-12 break-words text-[15px] leading-relaxed">{message || "Ketik pesan Anda..."}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}