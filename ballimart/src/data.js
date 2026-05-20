export const CATEGORIES = [
  { id: 'sabzi', name: 'Sabzi', emoji: '🥦' },
  { id: 'atta-dal', name: 'Atta & Dal', emoji: '🌾' },
  { id: 'dairy', name: 'Dairy', emoji: '🥛' },
  { id: 'snacks', name: 'Snacks', emoji: '🍪' },
  { id: 'pooja', name: 'Pooja', emoji: '🪔' },
  { id: 'masale', name: 'Masale', emoji: '🌶️' },
  { id: 'tel-ghee', name: 'Tel & Ghee', emoji: '🫙' },
  { id: 'phal', name: 'Phal', emoji: '🍎' },
];

export const PRODUCTS = [
  { id:1, name:'Taaza Palak', qty:'500g', price:18, emoji:'🥦', cat:'sabzi', shop:'Shyam Sabzi Wale', popular:true },
  { id:2, name:'Lal Tamatar', qty:'1kg', price:35, emoji:'🍅', cat:'sabzi', shop:'Shyam Sabzi Wale', popular:true },
  { id:3, name:'Aalu (Desi)', qty:'1kg', price:28, emoji:'🥔', cat:'sabzi', shop:'Shyam Sabzi Wale', popular:false },
  { id:4, name:'Pyaaz', qty:'1kg', price:40, emoji:'🧅', cat:'sabzi', shop:'Shyam Sabzi Wale', popular:true },
  { id:5, name:'Adrak', qty:'100g', price:15, emoji:'🫚', cat:'sabzi', shop:'Shyam Sabzi Wale', popular:false },
  { id:6, name:'Lahsun', qty:'100g', price:20, emoji:'🧄', cat:'sabzi', shop:'Shyam Sabzi Wale', popular:false },
  { id:7, name:'Gobhi', qty:'1 pcs', price:30, emoji:'🥦', cat:'sabzi', shop:'Shyam Sabzi Wale', popular:false },
  { id:8, name:'Aashirvaad Atta', qty:'5kg', price:229, emoji:'🌾', cat:'atta-dal', shop:'Ram Kirana Store', popular:true },
  { id:9, name:'Toor Dal', qty:'1kg', price:145, emoji:'🫘', cat:'atta-dal', shop:'Ram Kirana Store', popular:true },
  { id:10, name:'Chana Dal', qty:'1kg', price:110, emoji:'🫘', cat:'atta-dal', shop:'Ram Kirana Store', popular:false },
  { id:11, name:'Moong Dal', qty:'500g', price:75, emoji:'🟡', cat:'atta-dal', shop:'Ram Kirana Store', popular:false },
  { id:12, name:'Amul Doodh', qty:'500ml', price:27, emoji:'🥛', cat:'dairy', shop:'Gupta Dairy', popular:true },
  { id:13, name:'Amul Butter', qty:'100g', price:57, emoji:'🧈', cat:'dairy', shop:'Gupta Dairy', popular:true },
  { id:14, name:'Amul Dahi', qty:'400g', price:45, emoji:'🍶', cat:'dairy', shop:'Gupta Dairy', popular:false },
  { id:15, name:'Amul Paneer', qty:'200g', price:89, emoji:'🧀', cat:'dairy', shop:'Gupta Dairy', popular:true },
  { id:16, name:'Parle-G Biscuit', qty:'800g', price:85, emoji:'🍪', cat:'snacks', shop:'Ram Kirana Store', popular:true },
  { id:17, name:'Haldiram Namkeen', qty:'200g', price:55, emoji:'🥨', cat:'snacks', shop:'Ram Kirana Store', popular:true },
  { id:18, name:'Maggi Noodles', qty:'4 packs', price:68, emoji:'🍜', cat:'snacks', shop:'Ram Kirana Store', popular:false },
  { id:19, name:'Agarbatti', qty:'100 sticks', price:35, emoji:'🪔', cat:'pooja', shop:'Ram Kirana Store', popular:false },
  { id:20, name:'Dhoop Batti', qty:'1 box', price:45, emoji:'🕯️', cat:'pooja', shop:'Ram Kirana Store', popular:false },
  { id:21, name:'MDH Garam Masala', qty:'100g', price:65, emoji:'🌶️', cat:'masale', shop:'Ram Kirana Store', popular:true },
  { id:22, name:'Haldi Powder', qty:'200g', price:48, emoji:'🟡', cat:'masale', shop:'Ram Kirana Store', popular:false },
  { id:23, name:'Fortune Tel', qty:'1L', price:130, emoji:'🫙', cat:'tel-ghee', shop:'Ram Kirana Store', popular:true },
  { id:24, name:'Amul Ghee', qty:'500ml', price:285, emoji:'🟡', cat:'tel-ghee', shop:'Gupta Dairy', popular:true },
  { id:25, name:'Seb (Apple)', qty:'1kg', price:120, emoji:'🍎', cat:'phal', shop:'Shyam Sabzi Wale', popular:false },
  { id:26, name:'Kela', qty:'12 pcs', price:48, emoji:'🍌', cat:'phal', shop:'Shyam Sabzi Wale', popular:true },
];

export const SHOPS = [
  { id:1, name:'Ram Kirana Store', area:'Civil Lines', dist:'1.2 km', rating:4.7, emoji:'🏪', open:true, time:'7am–10pm' },
  { id:2, name:'Shyam Sabzi Wale', area:'Subzi Mandi', dist:'0.8 km', rating:4.5, emoji:'🥬', open:true, time:'5am–8pm' },
  { id:3, name:'Gupta Dairy & Sweets', area:'Saddar', dist:'1.8 km', rating:4.8, emoji:'🍼', open:true, time:'6am–9pm' },
  { id:4, name:'Soni Medical Store', area:'Collectorate', dist:'2.1 km', rating:4.6, emoji:'💊', open:false, time:'9am–9pm' },
];

export const BANNERS = [
  { id:1, title:'Pehli Order pe ₹50 OFF', sub:'Code: BALLIA50 · Min ₹199', bg:'#1b4332', accent:'#95d5b2', emoji:'🛒' },
  { id:2, title:'Free Delivery ₹299+', sub:'Ballia city mein seedha ghar tak', bg:'#7b2d8b', accent:'#e9d5f5', emoji:'🚴' },
  { id:3, title:'Fresh Sabzi Roz Subah', sub:'Seedha khet se aapke ghar', bg:'#b5451b', accent:'#ffd6c0', emoji:'🥦' },
];
