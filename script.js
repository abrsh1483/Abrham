// Data arrays
let doctors = [];
let appointments = [];
let newsUpdates = [];
let branches = [];
let adminPassword = "admin123";
let adminLogged = false;
let currentLang = 'am';
let cameraStream = null;
let loggedDoctor = null;

const serviceList = [
    { id:1, name_am: "የጥርስ መፍቻ", name_en: "Cleaning", price: 500, desc_am: "ጥርስን ማጽዳት", desc_en: "Teeth cleaning" },
    { id:2, name_am: "የጥርስ መሙያ", name_en: "Filling", price: 800, desc_am: "መሙያ", desc_en: "Filling" },
    { id:3, name_am: "ማውጣት", name_en: "Extraction", price: 600, desc_am: "የጥርስ ማውጣት", desc_en: "Extraction" },
    { id:4, name_am: "ሥር ሕክምና", name_en: "Root Canal", price: 1500, desc_am: "ሥር ሕክምና", desc_en: "Root Canal" },
    { id:5, name_am: "ማጣሪያ", name_en: "Whitening", price: 1200, desc_am: "ነጭ ማድረግ", desc_en: "Whitening" },
    { id:6, name_am: "ብሬስ", name_en: "Braces", price: 2500, desc_am: "አሰላለፍ ማስተካከያ", desc_en: "Braces" }
];
let workSettings = { sunHours: "15-22", weekHours: "14-00" };

const translations = {
    am: {
        hero_title: "ጣና የጥርስ ህክምና",
        hero_slogan: "ለሚያምር ፈጥጥታዎ ታማኝ አጋር!",
        hero_desc: "በባህር ዳር ጥራት ያለው አገልግሎት እንሰጣለን።",
        working_hours_text: "የስራ ሰዓት: ከሰኞ-ቅዳሜ 2:00 እስከ 12:00 | እሁድ 3:00 እስከ 10:00",
        equipment_title: "🩺 የጥርስ መሳሪያዎች / Dental Equipment",
        footer_address: "📍 ባህር ዳር, ኢትዮጵያ | 📞 +251-912-345678 | ✉️ info@tanadental.com",
        telegram: "📱 ቴሌግራም",
        tiktok: "🎵 ቲክቶክ",
        youtube: "▶️ ዩቲዩብ",
        copyright: "© 2025 Tana Dental Treatment",
        booking_title: "📝 አዲስ ቀጠሮ + አገልግሎቶች",
        fullname: "ሙሉ ስም",
        phone: "ስልክ (10 አሃዝ) ግዴታ",
        fingerprint: "🖐️ የጣት አሻራ ኮድ (ግዴታ)",
        photo_label: "📸 ፎቶ (ካሜራ ወይም ፋይል) - ግዴታ",
        camera_open: "📷 ካሜራ ክፈት",
        take_photo: "🎬 ፎቶ አንሳ",
        choose_file: "📁 ፋይል ምረጥ",
        app_date: "ቀን",
        time_slot: "ሰዓት",
        select_branch: "ቅርንጫፍ ይምረጡ / Select Branch",
        assigned_doctor_label: "የሚመደበው ዶክተር / Assigned Doctor:",
        services_label: "🛒 አገልግሎቶች (ከዚህ ይምረጡ)",
        total: "ጠቅላላ: 0 ETB",
        payment_method: "💸 የክፍያ ዘዴ",
        select_method: "-- ይምረጡ / Select --",
        payment_account: "📞 የክፍያ ስልክ / አካውንት ቁጥር",
        confirm_payment: "💵 ክፍያ አረጋግጥ",
        payment_pending: "❌ ክፍያ አልተፈጸመም",
        book_confirm: "✅ ቀጠሮ ያረጋግጡ",
        my_appointments_title: "📋 ቀጠሮዎቼን ይመልከቱ",
        enter_fingerprint: "🖐️ የጣት አሻራ ኮድ ያስገቡ",
        search_btn: "🔍 ፈልግ",
        logout_btn: "🚪 ውጣ / Logout",
        our_doctors: "👨‍⚕️ ዶክተሮቻችን",
        admin_panel: "🔐 አድሚን ፓነል",
        admin_login: "🔑 ግባ",
        add_doctor: "➕ አዲስ ዶክተር (ስልክ ብቻ እንዲለይ)",
        add_btn: "➕ ጨምር",
        change_admin_pass: "🔑 አድሚን ይለፍ ቃል መቀየር",
        change_btn: "ለውጥ",
        add_news: "📢 አዲስ ዜና / ማስታወቂያ",
        add_news_btn: "➕ ዜና ጨምር",
        branch_management: "🏢 ቅርንጫፍ አስተዳደር",
        add_branch: "➕ ቅርንጫፍ ጨምር",
        all_doctors_info: "👨‍⚕️ የሁሉም ዶክተሮች መረጃ",
        all_appointments: "ሁሉም ቀጠሮዎች",
        logout: "ውጣ",
        doctor_portal_title: "📱 የዶክተር መርጃ - ይግቡ",
        secret_number_label: "🔑 ሚስጥር ቁጥር / Secret Number (ይለፍ ቃል)",
        doctor_login_btn: "🔐 ግባ / Login",
        edit_profile: "✏️ የራሴን መረጃ አርትዕ",
        specialty: "ስፔሻሊቲ / Specialty",
        bank_account: "ባንክ አካውንት / Bank Account",
        new_secret: "🔄 አዲስ ሚስጥር ቁጥር (ይለፍ ቃል) / New Secret Number",
        save_changes: "💾 ማስቀመጫ / Save Changes",
        my_appointments_header: "📋 የእኔ ቀጠሮዎች (ሚስጥር ቁጥር መቀየር ይቻላል)",
        sms_notify: "📨 የSMS ማሳወቂያ",
        available_doctors_header: "🩺 ክፍት ዶክተሮች / Available Doctors",
        about_title: "📖 ስለ ክሊኒኩ / About Tana Dental",
        about_text: "ጣና የጥርስ ህክምና በባህር ዳር ከፍተኛ ጥራት ያለው የጥርስ አገልግሎት ይሰጣል።",
        services_title: "🦷 የምንሰጣቸው አገልግሎቶች",
        news_title: "📢 ዜናዎች",
        contact_title: "📞 አግኙን",
        contact_details: "📍 ባህር ዳር, ኢትዮጵያ | 📞 +251-912-345678 | ✉️ info@tanadental.com"
    },
    en: {
        hero_title: "Tana Dental Treatment",
        hero_slogan: "Your Trusted Partner for a Beautiful Smile!",
        hero_desc: "We provide quality dental care in Bahir Dar.",
        working_hours_text: "Working hours: Mon-Sat 2:00 PM - 12:00 AM | Sun 3:00 PM - 10:00 PM",
        equipment_title: "🩺 Dental Equipment",
        footer_address: "📍 Bahir Dar, Ethiopia | 📞 +251-912-345678 | ✉️ info@tanadental.com",
        telegram: "📱 Telegram",
        tiktok: "🎵 TikTok",
        youtube: "▶️ YouTube",
        copyright: "© 2025 Tana Dental Treatment",
        booking_title: "📝 New Appointment + Services",
        fullname: "Full Name",
        phone: "Phone (10 digits) Required",
        fingerprint: "🖐️ Fingerprint Code (Required)",
        photo_label: "📸 Photo (Camera or File) - Required",
        camera_open: "📷 Open Camera",
        take_photo: "🎬 Take Photo",
        choose_file: "📁 Choose File",
        app_date: "Date",
        time_slot: "Time",
        select_branch: "Select Branch",
        assigned_doctor_label: "Assigned Doctor:",
        services_label: "🛒 Services (Select from below)",
        total: "Total: 0 ETB",
        payment_method: "💸 Payment Method",
        select_method: "-- Select --",
        payment_account: "📞 Payment Phone / Account Number",
        confirm_payment: "💵 Confirm Payment",
        payment_pending: "❌ Payment not completed",
        book_confirm: "✅ Confirm Appointment",
        my_appointments_title: "📋 My Appointments",
        enter_fingerprint: "🖐️ Enter your Fingerprint Code",
        search_btn: "🔍 Search",
        logout_btn: "🚪 Logout",
        our_doctors: "👨‍⚕️ Our Doctors",
        admin_panel: "🔐 Admin Panel",
        admin_login: "🔑 Login",
        add_doctor: "➕ Add New Doctor (Unique Phone)",
        add_btn: "➕ Add",
        change_admin_pass: "🔑 Change Admin Password",
        change_btn: "Change",
        add_news: "📢 Add News / Announcement",
        add_news_btn: "➕ Add News",
        branch_management: "🏢 Branch Management",
        add_branch: "➕ Add Branch",
        all_doctors_info: "👨‍⚕️ All Doctors Information",
        all_appointments: "All Appointments",
        logout: "Logout",
        doctor_portal_title: "📱 Doctor Portal - Login",
        secret_number_label: "🔑 Secret Number (Password)",
        doctor_login_btn: "🔐 Login",
        edit_profile: "✏️ Edit My Profile",
        specialty: "Specialty",
        bank_account: "Bank Account",
        new_secret: "🔄 New Secret Number (Password)",
        save_changes: "💾 Save Changes",
        my_appointments_header: "📋 My Appointments (Can reset secret ID)",
        sms_notify: "📨 SMS Notification",
        available_doctors_header: "🩺 Available Doctors",
        about_title: "📖 About Tana Dental",
        about_text: "Tana Dental Treatment provides high-quality dental care in Bahir Dar.",
        services_title: "🦷 Our Services",
        news_title: "📢 News & Updates",
        contact_title: "📞 Contact Us",
        contact_details: "📍 Bahir Dar, Ethiopia | 📞 +251-912-345678 | ✉️ info@tanadental.com"
    }
};

function applyLanguage() {
    for (let key in translations[currentLang]) {
        document.querySelectorAll(`[data-key="${key}"]`).forEach(el => el.innerText = translations[currentLang][key]);
    }
    renderServiceCheckboxes(); renderDetailedServices(); renderDoctorsList(); if(loggedDoctor) renderDoctorAppointments();
}

function getDoctorDailyCount(doctorId, date) {
    return appointments.filter(a => a.doctorId === doctorId && a.date === date).length;
}
function isDoctorAvailableOnDate(doctorId, date) {
    return getDoctorDailyCount(doctorId, date) < 3;
}
function getAvailableDoctorForDate(date) {
    for (let doc of doctors) if (isDoctorAvailableOnDate(doc.id, date)) return doc;
    return null;
}
function patientHasAnyAppointment(phone, fingerprint, excludeId = null) {
    return appointments.some(a => (a.patientPhone === phone || a.patientFingerprint === fingerprint) && a.id !== excludeId);
}

function loadData() {
    let storedDocs = localStorage.getItem('tana_doctors');
    if(storedDocs) doctors = JSON.parse(storedDocs);
    else doctors = [
        { id:1, name:"Dr. Mekdes Alemu", specialty:"አጠቃላይ", photo:"https://randomuser.me/api/portraits/women/44.jpg", phone:"0911111111", bankAccount:"1000123456789", password:"doc123" },
        { id:2, name:"Dr. Yonas Desta", specialty:"ቀዶ ጥገና", photo:"https://randomuser.me/api/portraits/men/45.jpg", phone:"0922222222", bankAccount:"1000987654321", password:"doc456" }
    ];
    appointments = JSON.parse(localStorage.getItem('tana_appointments') || '[]');
    adminPassword = localStorage.getItem('tana_adminPass') || "admin123";
    newsUpdates = JSON.parse(localStorage.getItem('tana_news') || '[]');
    let storedWork = localStorage.getItem('tana_workHours');
    if(storedWork) workSettings = JSON.parse(storedWork);
    let storedBranches = localStorage.getItem('tana_branches');
    if(storedBranches) branches = JSON.parse(storedBranches);
    else branches = [
        { id:1, name: "ቅርንጫፍ ቁጥር 1", location: "ግህር ዱር" },
        { id:2, name: "ቅርንጫፍ ቁጥር 2", location: "ግህር ዱር" }
    ];
}
function saveData() {
    localStorage.setItem('tana_doctors',JSON.stringify(doctors));
    localStorage.setItem('tana_appointments',JSON.stringify(appointments));
    localStorage.setItem('tana_adminPass',adminPassword);
    localStorage.setItem('tana_news',JSON.stringify(newsUpdates));
    localStorage.setItem('tana_workHours',JSON.stringify(workSettings));
    localStorage.setItem('tana_branches',JSON.stringify(branches));
}

function getTimeSlots(dateStr) {
    let date = new Date(dateStr), day = date.getDay(), slots = [];
    if(day === 0) { let [s,e] = workSettings.sunHours.split('-').map(Number); for(let h=s; h<e; h++) slots.push(`${h}:00`); if(e===0) slots.push("00:00"); }
    else { let [s,e] = workSettings.weekHours.split('-').map(Number); for(let h=s; h<24; h++) slots.push(`${h}:00`); if(e===0 || e<s) slots.push("00:00"); }
    return slots;
}

function validateConstraints(docId, date, timeSlot, phone, fingerprint, excludeId=null) {
    if(patientHasAnyAppointment(phone, fingerprint, excludeId)) return { valid: false, msg: currentLang==='am'?"አንድ በሽተኛ በህይወቱ አንድ ጊዜ ብቻ ቀጠሮ መያዝ ይችላል! ድጋሚ ማስያዝ አይቻልም።":"A patient can only book one appointment in their lifetime. No repeat bookings allowed." };
    let sameTime = appointments.find(a => a.date === date && a.timeSlot === timeSlot && (a.patientPhone === phone || a.patientFingerprint === fingerprint) && a.id !== excludeId);
    if(sameTime) return { valid: false, msg: currentLang==='am'?"በዚህ ቀንና ሰዓት ቀጠሮ አለዎት!":"Time conflict" };
    let doctorDayCount = getDoctorDailyCount(docId, date);
    if(doctorDayCount >= 3) return { valid: false, msg: currentLang==='am'?"ዶክተሩ በዚህ ቀን 3 ሙሏል!":"Doctor fully booked for this date." };
    return { valid: true };
}

function generateSixDigitId() { let id; do { id = Math.floor(100000 + Math.random() * 900000); } while (appointments.some(a => a.id === id)); return id; }

function renderBranchesHome() {
    let container = document.getElementById('branchesContainer');
    if(container) container.innerHTML = branches.map(b => `<div class="branch-card"><h3>🏥 ${b.name}</h3><p>${b.location}</p></div>`).join('');
    // Also populate branch dropdown in booking form
    let branchSelect = document.getElementById('branchSelect');
    if(branchSelect) {
        branchSelect.innerHTML = '<option value="">' + (currentLang==='am'?'-- ቅርንጫፍ ይምረጡ --':'-- Select Branch --') + '</option>' +
            branches.map(b => `<option value="${b.id}">${b.name} - ${b.location}</option>`).join('');
    }
}
function renderBranchesAdmin() {
    let container = document.getElementById('branchesAdminList');
    if(container && adminLogged) container.innerHTML = branches.map(b => `<div class="branch-card" style="width:100%; justify-content:space-between; display:flex; align-items:center;"><div><strong>${b.name}</strong> - ${b.location}</div><button class="danger small" style="width:auto;" onclick="deleteBranch(${b.id})">🗑 ሰርዝ</button></div>`).join('');
}
window.deleteBranch = (id) => { if(confirm('ማስወገድ ይፈልጋሉ?')) { branches = branches.filter(b => b.id !== id); saveData(); renderBranchesHome(); if(adminLogged) renderBranchesAdmin(); alert('ቅርንጫፍ ተሰርዟል'); } };

function renderDoctorsList() {
    let c = document.getElementById('doctorsContainer'); if(c) {
        let today = new Date().toISOString().split('T')[0];
        c.innerHTML = doctors.map(d=>{ let countToday = getDoctorDailyCount(d.id, today); let status = countToday < 3 ? '✅ Available today' : '❌ Fully booked today';
            return `<div class="doctor-item"><img class="doctor-photo" src="${d.photo}" onerror="this.src='https://via.placeholder.com/55'"><div><strong>${d.name}</strong><br>${d.specialty}<br>${status}</div></div>`; }).join('');
    }
}
function renderAdminDoctorsList() {
    let c = document.getElementById('adminDoctorsList'); if(c && adminLogged) c.innerHTML = doctors.map(d=>`<div class="doctor-item"><img class="doctor-photo" src="${d.photo}" onerror="this.src='https://via.placeholder.com/55'"><div><strong>${d.name}</strong><br>📞 ${d.phone}<br>🏦 ${d.bankAccount}<br>🔧 ${d.specialty}<br>🔑 ሚስጥር ቁጥር: ${d.password}</div><div><button class="secondary small" onclick="editDoctor(${d.id})">✏️ አርትዕ</button><button class="danger small" onclick="deleteDoctor(${d.id})">🗑 ሰርዝ</button></div></div>`).join('');
}
function renderAdminAppointments() {
    let c = document.getElementById('adminAppointmentsList'); if(c && adminLogged) c.innerHTML = appointments.map(a=>{let d=doctors.find(d=>d.id===a.doctorId); let branch = branches.find(b=>b.id===a.branchId); return `<div class="appointment-entry"><div><strong>${a.patientName}</strong> | ${a.patientPhone}<br>📅 ${a.date} ${a.timeSlot}<br>🏢 ${branch ? branch.name : 'N/A'}<br>🖐️ ${a.patientFingerprint}<br>👨‍⚕️ ${d?.name}<br>💰 ${a.totalServiceCost+200} ETB<br>💳 ${a.paymentMethod} | ${a.paymentAccount}<br>${a.treated?'✅ ተክቷል':'⏳ አልተከተመም'} ${a.rescheduled?' (የተራዘመ)':''}<br>🔑 ${a.id}</div><button class="danger small" onclick="cancelAppointment(${a.id})">ሰርዝ</button></div>`; }).join('');
}
function renderDoctorAppointments() {
    if(!loggedDoctor) return; let my=appointments.filter(a=>a.doctorId===loggedDoctor.id); let div=document.getElementById('doctorAppointmentsResult'); div.innerHTML=my.map(a=>{let branch = branches.find(b=>b.id===a.branchId); return `<div class="appointment-entry"><div>${a.patientName} | ${a.patientPhone}<br>📅 ${a.date} ${a.timeSlot}<br>🏢 ${branch ? branch.name : 'N/A'}<br>💰 ${a.totalServiceCost+200} ETB<br>${a.treated?'✅ ተክቷል':'⏳ አልተከተመም'} ${a.rescheduled?' (የተራዘመ)':''}<br>🔑 ${a.id}</div><div><button class="success" onclick="markTreatmentCompleted(${a.id})">✅ ሕክምና አረጋግጥ</button><button class="secondary small" onclick="resetSecretNumber(${a.id})">🔄 አዲስ ሚስጥር ቁጥር</button><button class="secondary" onclick="alert('SMS sent')">📨 SMS</button></div></div>`; }).join(''); displayAvailableDoctors();
}
function displayAvailableDoctors() {
    let c=document.getElementById('availableDoctorsList'); if(c) c.innerHTML=doctors.filter(d => (!loggedDoctor || d.id!==loggedDoctor.id) && isDoctorAvailableOnDate(d.id, new Date().toISOString().split('T')[0])).map(d=>`<span class="badge">${d.name}</span>`).join(' ') || 'None';
}
function renderMyAppointmentsByFingerprint(fingerprint) {
    let container = document.getElementById('myAppointmentsList'), logoutBtn = document.getElementById('patientLogoutBtn');
    if(!container) return;
    let filtered = appointments.filter(a => a.patientFingerprint === fingerprint);
    if(filtered.length === 0){ container.innerHTML='<div class="badge">አልተገኘም / Not found</div>'; logoutBtn.style.display = 'none'; return; }
    logoutBtn.style.display = 'inline-block';
    container.innerHTML = filtered.map(a => { let doc = doctors.find(d=>d.id===a.doctorId); let branch = branches.find(b=>b.id===a.branchId); let resched = ''; if(!a.treated && !a.rescheduled) resched = `<div><select id="newDate_${a.id}"></select><select id="newTime_${a.id}"></select><button class="secondary small" onclick="prepareReschedule(${a.id})">ማራዘም</button></div>`;
        return `<div class="appointment-entry"><div><strong>${a.patientName}</strong><br>📅 ${a.date} ${a.timeSlot}<br>🏢 ${branch ? branch.name : 'N/A'}<br>👨‍⚕️ ${doc?.name}<br>💰 ${a.totalServiceCost+200} ETB<br>${a.treated?'✅ ተክቷል':'⏳ አልተከተመም'}<br>🔑 ${a.id}</div><div>${resched}<button class="danger" onclick="cancelAppointment(${a.id})">ሰርዝ</button></div></div>`;
    }).join('');
    filtered.forEach(a => { let ds = document.getElementById(`newDate_${a.id}`); if(ds && !a.rescheduled && !a.treated) { let orig = new Date(a.date), opts = []; for(let i=7;i<=30;i++){ let d = new Date(orig); d.setDate(orig.getDate()+i); opts.push(d.toISOString().split('T')[0]); } ds.innerHTML = '<option>ቀን</option>'+opts.map(d=>`<option value="${d}">${d}</option>`).join(''); ds.onchange = function(){ let ts = document.getElementById(`newTime_${a.id}`); let slots = getTimeSlots(this.value); ts.innerHTML = '<option>ሰዓት</option>'+slots.map(s=>`<option value="${s}">${s}</option>`).join(''); }; } });
}
window.prepareReschedule = (id) => { let newDate = document.getElementById(`newDate_${id}`).value, newTime = document.getElementById(`newTime_${id}`).value; if(newDate && newTime) rescheduleAppointment(id, newDate, newTime); else alert('ቀን እና ሰዓት ይምረጡ'); };

function renderServiceCheckboxes() { let c=document.getElementById('serviceCheckboxes'); if(c) c.innerHTML=serviceList.map(s=>`<label style="display:inline-block; margin-right:15px;"><input type="checkbox" value="${s.id}" class="serviceCheck"> ${currentLang==='am'?s.name_am:s.name_en} (${s.price} ETB)</label>`).join(''); document.querySelectorAll('.serviceCheck').forEach(cb=>cb.addEventListener('change',()=>{ let total=0, sel=[]; document.querySelectorAll('.serviceCheck:checked').forEach(cb=>{ let id=parseInt(cb.value); let svc=serviceList.find(s=>s.id===id); if(svc){ total+=svc.price; sel.push(id); } }); document.getElementById('selectedServicesTotal').innerText=`${currentLang==='am'?'ጠቅላላ:':'Total:'} ${total} ETB`; document.getElementById('selectedServicesJSON').value=JSON.stringify(sel); })); updateServiceTotal(); }
function updateServiceTotal(){ let total=0, sel=[]; document.querySelectorAll('.serviceCheck:checked').forEach(cb=>{ let id=parseInt(cb.value); let svc=serviceList.find(s=>s.id===id); if(svc){ total+=svc.price; sel.push(id); } }); document.getElementById('selectedServicesTotal').innerText=`${currentLang==='am'?'ጠቅላላ:':'Total:'} ${total} ETB`; document.getElementById('selectedServicesJSON').value=JSON.stringify(sel); }

function renderDetailedServices(){ let c=document.getElementById('servicesDetailedList'); if(c) c.innerHTML=serviceList.map(s=>`<div class="service-detail"><strong>🦷 ${currentLang==='am'?s.name_am:s.name_en}</strong> - ${s.price} ETB<br><small>${currentLang==='am'?s.desc_am:s.desc_en}</small></div>`).join(''); }
function renderNewsList(){ let c=document.getElementById('newsListContainer'); if(c) c.innerHTML=newsUpdates.length?newsUpdates.map(n=>`<div class="news-item"><strong>📢 ${n.title}</strong> <small>(${n.date})</small><p>${n.content}</p></div>`).join(''):'<div class="badge">ምንም ዜና የለም</div>'; }
function renderSocialLinks(){ let social={telegram:"#",tiktok:"#",youtube:"#"}; document.getElementById('footerSocialLinks').innerHTML=`<a href="${social.telegram}" target="_blank">📱 ቴሌግራም</a><a href="${social.tiktok}" target="_blank">🎵 ቲክቶክ</a><a href="${social.youtube}" target="_blank">▶️ ዩቲዩብ</a>`; document.getElementById('aboutSocialLinks').innerHTML=`<a href="${social.telegram}" target="_blank">Telegram</a> <a href="${social.tiktok}" target="_blank">TikTok</a> <a href="${social.youtube}" target="_blank">YouTube</a>`; }

function addAppointment(app) { appointments.push(app); saveData(); let total = app.totalServiceCost + 200; let branch = branches.find(b=>b.id===app.branchId); alert(`📋 ደርሰኝ / RECEIPT\n🔑 ሚስጥር ቁጥር: ${app.id}\n👤 ${app.patientName}\n📅 ${app.date} ${app.timeSlot}\n🏢 ቅርንጫፍ: ${branch ? branch.name : 'N/A'}\n👨‍⚕️ ዶክተር: ${doctors.find(d=>d.id===app.doctorId)?.name}\n💰 ${total} ETB\n💳 ክፍያ: ${app.paymentMethod} | ${app.paymentAccount}\n📜 የተቋሙ ማህተም: ጣና የጥርስ ህክምና`); renderAll(); }

function renderAll() {
    renderDoctorsList(); renderAdminDoctorsList(); renderAdminAppointments(); renderDoctorAppointments(); renderBranchesHome(); if(adminLogged) renderBranchesAdmin();
    let date = document.getElementById('appointmentDate')?.value;
    if(date) { let availableDoc = getAvailableDoctorForDate(date); document.getElementById('assignedDoctorName').innerText = availableDoc ? availableDoc.name : (currentLang==='am'?'ምንም ዶክተር አልተገኘም':'No doctor available'); }
}

window.deleteDoctor = (id) => {
    if(confirm("ማስወገድ ይፈልጋሉ? ዶክተሩ እና ተዛማጅ ቀጠሮዎች ይሰረዛሉ.")) {
        doctors = doctors.filter(d => d.id !== id);
        appointments = appointments.filter(a => a.doctorId !== id);
        saveData(); renderAll();
        if(loggedDoctor && loggedDoctor.id === id) loggedDoctor = null;
        alert('ዶክተር ተሰርዟል');
    }
};
window.editDoctor = (id) => { let doc = doctors.find(d => d.id === id); if(!doc) return; let newName = prompt("አዲስ ስም", doc.name); if(newName) { doc.name = newName; saveData(); alert('ዶክተር ተሻሽሏል'); renderAll(); } };
window.resetSecretNumber = (appId) => { let app = appointments.find(a => a.id === appId); if(!app || !loggedDoctor || loggedDoctor.id !== app.doctorId) { alert("ፈቃድ የለዎትም"); return; } let newId = generateSixDigitId(); app.id = newId; saveData(); alert(`ሚስጥር ቁጥር ተቀይሯል! አዲስ: ${newId}`); renderAll(); };
window.cancelAppointment = (id) => { if(confirm("ሰርዝ? 200 ብር አይመለስም")) { appointments = appointments.filter(a => a.id !== id); saveData(); renderAll(); alert('ቀጠሮ ተሰርዟል'); } };
window.rescheduleAppointment = (id, newDate, newTime) => {
    let app = appointments.find(a => a.id === id); if(!app) return false;
    if(app.rescheduled) { alert("ቀድሞ ተራዝሟል!"); return false; }
    let diff = Math.ceil((new Date(newDate) - new Date(app.date)) / (1000*60*60*24));
    if(diff < 7) { alert("ከ7 ቀን በኋላ ብቻ!"); return false; }
    let constraint = validateConstraints(app.doctorId, newDate, newTime, app.patientPhone, app.patientFingerprint, id);
    if(!constraint.valid) { alert(constraint.msg); return false; }
    app.date = newDate; app.timeSlot = newTime; app.rescheduled = true; saveData(); alert("ቀጠሮ ተራዝሟል!"); renderAll(); return true;
};
window.markTreatmentCompleted = (id) => {
    let app = appointments.find(a => a.id === id); if(app && !app.treated) { app.treated = true; app.treatedDate = new Date().toLocaleString(); saveData(); alert(`📜 ማረጋገጫ / Certificate\nታካሚ: ${app.patientName}\nቀን: ${app.treatedDate}\nጠቅላላ: ${app.totalServiceCost+200} ETB\n🏢 ማህተም: ጣና የጥርስ ህክምና`); renderAll(); }
};

async function startCamera(){ if(cameraStream) stopCamera(); try{ let s=await navigator.mediaDevices.getUserMedia({video:true}); document.getElementById('cameraVideo').srcObject=s; document.getElementById('cameraVideo').style.display='block'; cameraStream=s; } catch(e){ alert('Camera error'); } }
function stopCamera(){ if(cameraStream){ cameraStream.getTracks().forEach(t=>t.stop()); cameraStream=null; document.getElementById('cameraVideo').style.display='none'; } }
function capturePhoto(){ let video=document.getElementById('cameraVideo'); let canvas=document.getElementById('canvasPhoto'); canvas.width=video.videoWidth; canvas.height=video.videoHeight; canvas.getContext('2d').drawImage(video,0,0); let dataUrl=canvas.toDataURL('image/jpeg'); document.getElementById('photoData').value=dataUrl; document.getElementById('photoPreview').src=dataUrl; document.getElementById('photoPreview').style.display='block'; stopCamera(); }

document.addEventListener('DOMContentLoaded', () => {
    loadData(); saveData();
    renderAll();
    renderServiceCheckboxes();
    renderDetailedServices();
    renderNewsList();
    renderSocialLinks();
    
    document.getElementById('startCameraBtn')?.addEventListener('click', startCamera);
    document.getElementById('takePhotoBtn')?.addEventListener('click', capturePhoto);
    document.getElementById('fileUpload')?.addEventListener('change', function(e){ let file=e.target.files[0]; if(file){ let reader=new FileReader(); reader.onload=function(ev){ document.getElementById('photoData').value=ev.target.result; document.getElementById('photoPreview').src=ev.target.result; document.getElementById('photoPreview').style.display='block'; }; reader.readAsDataURL(file); } });
    document.getElementById('confirmPaymentBtn')?.addEventListener('click', () => {
        let method = document.getElementById('paymentMethodSelect').value, account = document.getElementById('paymentAccount').value.trim();
        if(!method){ alert('የክፍያ ዘዴ ይምረጡ'); return; } if(!account){ alert('እባክዎ የክፍያ ስልክ / አካውንት ቁጥር ያስገቡ'); return; }
        let ref = 'TXN'+Math.floor(Math.random()*10000000);
        if(confirm(`ክፍያ 200 ETB + አገልግሎት? ዘዴ: ${method}\nስልክ/አካውንት: ${account}\nግብይት መለያ: ${ref}`)){
            document.getElementById('paymentDone').value = 'true';
            document.getElementById('selectedPaymentMethod').value = method;
            document.getElementById('paymentAccountValue').value = account;
            document.getElementById('paymentStatusText').innerHTML = `✅ ክፍያ ተፈጽሟል! ዘዴ: ${method} | አካውንት: ${account} | መለያ: ${ref}`;
        }
    });
    document.getElementById('bookingForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        let fn = document.getElementById('fullName').value.trim(), ph = document.getElementById('phoneNum').value.trim(), fp = document.getElementById('fingerCode').value.trim(), photo = document.getElementById('photoData').value;
        let date = document.getElementById('appointmentDate').value, time = document.getElementById('timeSlotSelect').value, branchId = parseInt(document.getElementById('branchSelect').value);
        let payOk = document.getElementById('paymentDone').value === 'true', payMethod = document.getElementById('selectedPaymentMethod').value, payAccount = document.getElementById('paymentAccountValue').value;
        if(!fn || !ph || !fp || !photo || !date || !time || !branchId){ alert('ሁሉንም መረጃዎች ይሙሉ (ስም፣ ስልክ፣ አሻራ፣ ፎቶ፣ ቀን፣ ሰዓት፣ ቅርንጫፍ)'); return; }
        if(!/^\d{10}$/.test(ph)){ alert('ስልክ 10 አሃዝ መሆን አለበት'); return; }
        if(!payOk){ alert('እባክዎ ክፍያ ያረጋግጡ'); return; }
        let assignedDoctor = getAvailableDoctorForDate(date);
        if(!assignedDoctor) { alert(currentLang==='am'?'ለተመረጠው ቀን ምንም ክፍት ዶክተር የለም። እባክዎ ሌላ ቀን ይምረጡ።':'No doctor available on this date.'); return; }
        let constraint = validateConstraints(assignedDoctor.id, date, time, ph, fp);
        if(!constraint.valid){ alert(constraint.msg); return; }
        let services = JSON.parse(document.getElementById('selectedServicesJSON').value || '[]');
        let serviceTotal = services.reduce((s,id)=>s+(serviceList.find(sv=>sv.id===id)?.price||0),0);
        let newId = generateSixDigitId();
        addAppointment({ id:newId, patientName:fn, patientPhone:ph, patientFingerprint:fp, patientPhoto:photo, doctorId:assignedDoctor.id, date, timeSlot:time, treated:false, services, totalServiceCost:serviceTotal, rescheduled:false, paymentMethod:payMethod, paymentAccount:payAccount, branchId:branchId });
        document.getElementById('bookingForm').reset(); document.getElementById('photoData').value=''; document.getElementById('photoPreview').style.display='none'; document.getElementById('paymentDone').value='false'; document.getElementById('paymentStatusText').innerHTML='❌ አልተከፈለም'; renderServiceCheckboxes(); renderAll();
    });
    document.getElementById('appointmentDate')?.addEventListener('change', (e) => {
        let slots = getTimeSlots(e.target.value);
        let sel = document.getElementById('timeSlotSelect');
        sel.innerHTML = slots.map(s=>`<option value="${s}">${s}</option>`).join('');
        if(!slots.length) sel.innerHTML='<option disabled>No slots</option>';
        let availableDoc = getAvailableDoctorForDate(e.target.value);
        document.getElementById('assignedDoctorName').innerText = availableDoc ? availableDoc.name : (currentLang==='am'?'ምንም ዶክተር አልተገኘም':'No doctor available');
    });
    document.getElementById('searchByFingerprintBtn')?.addEventListener('click', () => { let fp = document.getElementById('fingerprintSearch').value.trim(); if(!fp) alert('አሻራ ያስገቡ'); else renderMyAppointmentsByFingerprint(fp); });
    document.getElementById('patientLogoutBtn')?.addEventListener('click', () => { document.getElementById('myAppointmentsList').innerHTML = ''; document.getElementById('fingerprintSearch').value = ''; document.getElementById('patientLogoutBtn').style.display = 'none'; });
    
    document.getElementById('doctorLoginBtn')?.addEventListener('click', () => { let pass = document.getElementById('doctorLoginPass').value.trim(); let doc = doctors.find(d=>d.password===pass); if(doc) { loggedDoctor = doc; document.getElementById('doctorLoginArea').style.display = 'none'; document.getElementById('doctorPrivateArea').style.display = 'block'; document.getElementById('loggedDoctorInfo').innerHTML = `<div class="badge">👨‍⚕️ ${doc.name} | ${doc.phone} | ${doc.bankAccount}</div>`; document.getElementById('editDocName').value = doc.name; document.getElementById('editDocSpecialty').value = doc.specialty; document.getElementById('editDocPhone').value = doc.phone; document.getElementById('editDocBank').value = doc.bankAccount; document.getElementById('editDocPassword').value = ''; renderDoctorAppointments(); } else { document.getElementById('doctorLoginError').style.display = 'block'; document.getElementById('doctorLoginError').innerText = 'የተሳሳተ ሚስጥር ቁጥር!'; } });
    document.getElementById('doctorLogoutBtn')?.addEventListener('click', () => { loggedDoctor = null; document.getElementById('doctorLoginArea').style.display = 'block'; document.getElementById('doctorPrivateArea').style.display = 'none'; document.getElementById('doctorLoginPass').value = ''; });
    document.getElementById('saveDoctorProfileBtn')?.addEventListener('click', () => { if(!loggedDoctor) return; let newName = document.getElementById('editDocName').value.trim(), newSpec = document.getElementById('editDocSpecialty').value.trim(), newPhone = document.getElementById('editDocPhone').value.trim(), newBank = document.getElementById('editDocBank').value.trim(), newPass = document.getElementById('editDocPassword').value.trim(); if(!newName||!newSpec||!newPhone||!newBank) { alert('ሁሉንም ይሙሉ'); return; } if(!/^\d{10}$/.test(newPhone)) { alert('ስልክ 10 አሃዝ'); return; } loggedDoctor.name = newName; loggedDoctor.specialty = newSpec; loggedDoctor.phone = newPhone; loggedDoctor.bankAccount = newBank; if(newPass) loggedDoctor.password = newPass; let idx = doctors.findIndex(d=>d.id===loggedDoctor.id); if(idx!==-1) doctors[idx] = loggedDoctor; saveData(); document.getElementById('loggedDoctorInfo').innerHTML = `<div class="badge">👨‍⚕️ ${loggedDoctor.name} | ${loggedDoctor.phone} | ${loggedDoctor.bankAccount}</div>`; renderAll(); alert('መረጃ ተሻሽሏል'); });
    
    document.getElementById('adminLoginBtn')?.addEventListener('click', () => { if(prompt('Admin Password:') === adminPassword) { adminLogged = true; document.getElementById('adminArea').style.display = 'block'; renderAdminDoctorsList(); renderAdminAppointments(); renderBranchesAdmin(); } else alert('Wrong'); });
    document.getElementById('adminLogout')?.addEventListener('click', () => { adminLogged = false; document.getElementById('adminArea').style.display = 'none'; });
    document.getElementById('changeAdminPassBtn')?.addEventListener('click', () => { let newp = document.getElementById('newAdminPass').value; if(newp.length>=4) { adminPassword = newp; saveData(); alert('Password changed'); } });
    document.getElementById('addDoctorAdmin')?.addEventListener('click', () => {
        if(!adminLogged) return;
        let name = document.getElementById('newDocName').value.trim(), spec = document.getElementById('newDocSpecial').value.trim(), phone = document.getElementById('newDocPhone').value.trim(), bank = document.getElementById('newDocBank').value.trim(), pass = document.getElementById('newDocPass').value.trim();
        if(!name || !spec || !phone || !bank || !pass) { alert('ሁሉንም ይሙሉ'); return; }
        if(!/^\d{10}$/.test(phone)) { alert('ስልክ 10 አሃዝ'); return; }
        if(doctors.some(d => d.phone === phone)) { alert('ይህ ስልክ ቁጥር ቀድሞ ለሌላ ዶክተር ተመዝግቧል! ድጋሜ መመዝገብ አይቻልም።'); return; }
        let file = document.getElementById('newDocPhoto').files[0];
        let reader = new FileReader();
        reader.onload = (ev) => { doctors.push({id:Date.now(), name, specialty:spec, photo:ev.target.result, phone, bankAccount:bank, password:pass}); saveData(); renderAll(); alert('ዶክተር ተጨመረ'); };
        if(file) reader.readAsDataURL(file);
        else { doctors.push({id:Date.now(), name, specialty:spec, photo:'https://via.placeholder.com/55', phone, bankAccount:bank, password:pass}); saveData(); renderAll(); alert('Added'); }
    });
    document.getElementById('addNewsBtn')?.addEventListener('click', () => { if(!adminLogged) return; let title = document.getElementById('newsTitle').value.trim(), content = document.getElementById('newsContent').value.trim(); if(!title||!content) { alert('ርዕስ እና ዝርዝር ያስፈልጋል'); return; } newsUpdates.unshift({id:Date.now(), title, content, date:new Date().toLocaleString()}); saveData(); renderNewsList(); document.getElementById('newsTitle').value=''; document.getElementById('newsContent').value=''; alert('News added'); });
    document.getElementById('addBranchBtn')?.addEventListener('click', () => { if(!adminLogged) return; let name = document.getElementById('newBranchName').value.trim(), location = document.getElementById('newBranchLocation').value.trim(); if(!name || !location) { alert('ሁለቱንም መስኮች ይሙሉ'); return; } branches.push({ id:Date.now(), name, location }); saveData(); renderBranchesHome(); renderBranchesAdmin(); document.getElementById('newBranchName').value = ''; document.getElementById('newBranchLocation').value = ''; alert('ቅርንጫፍ ተጨምሯል'); });

    let side = document.getElementById('sideMenu'), ov = document.getElementById('overlayBg');
    document.getElementById('menuToggle').onclick = () => { side.classList.add('open'); ov.classList.add('active'); };
    document.getElementById('closeSidebarBtn').onclick = () => { side.classList.remove('open'); ov.classList.remove('active'); };
    ov.onclick = () => { side.classList.remove('open'); ov.classList.remove('active'); };
    document.querySelectorAll('.nav-item').forEach(i => i.addEventListener('click', () => {
        let p = i.getAttribute('data-page');
        document.querySelectorAll('.page').forEach(pg => pg.classList.remove('active-page'));
        document.getElementById(`${p}Page`).classList.add('active-page');
        if(p === 'doctors') renderDoctorsList();
        if(p === 'admin' && adminLogged) { renderAdminDoctorsList(); renderAdminAppointments(); renderBranchesAdmin(); }
        if(p === 'about') { renderNewsList(); renderDetailedServices(); }
        side.classList.remove('open'); ov.classList.remove('active');
    }));
    
    document.querySelectorAll('.lang-btn').forEach(btn => btn.addEventListener('click', (e) => {
        currentLang = e.target.getAttribute('data-lang');
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        applyLanguage();
        renderNewsList(); renderSocialLinks(); renderDetailedServices(); renderAll();
    }));
    
    let today = new Date().toISOString().split('T')[0];
    let inp = document.getElementById('appointmentDate');
    if(inp) { inp.value = today; inp.dispatchEvent(new Event('change')); }
    
    applyLanguage();
});