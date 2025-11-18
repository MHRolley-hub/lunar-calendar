let currentDate = new Date();
let deferredPrompt;

// Vietnamese lunar calendar holidays with bilingual descriptions
const vietnameseHolidays = {
    '1/1': {
        nameEn: 'Tết Nguyên Đán (Vietnamese New Year)',
        nameVi: 'Tết Nguyên Đán',
        descriptionEn: 'The most important holiday in Vietnamese culture, celebrating the arrival of spring and the lunar new year. Families gather, pay respects to ancestors, exchange lucky money, and enjoy traditional foods.',
        descriptionVi: 'Ngày lễ quan trọng nhất trong văn hóa Việt Nam, chào đón mùa xuân và năm mới âm lịch. Gia đình sum họp, thờ cúng tổ tiên, trao lì xì may mắn và thưởng thức các món ăn truyền thống.',
        traditions: 'Visiting temples, giving red envelopes, eating bánh chưng',
        offerings: 'Bánh chưng, bánh tét, pickled onions, boiled chicken, five-fruit tray, sticky rice, traditional cakes, tea, wine'
    },
    '1/2': {
        nameEn: 'Tết Nguyên Đán (Day 2)',
        nameVi: 'Tết Nguyên Đán (Mùng 2)',
        descriptionEn: 'Second day of Tết - traditionally for visiting friends, teachers, and extended family. Many people also visit pagodas to pray for good fortune.',
        descriptionVi: 'Ngày mùng 2 Tết - truyền thống đi thăm bạn bè, thầy cô và họ hàng xa. Nhiều người cũng đi chùa cầu may mắn.',
        traditions: 'Visiting relatives, temple visits, family gatherings',
        offerings: 'Continued Tết offerings: fruits, cakes, tea, incense'
    },
    '1/3': {
        nameEn: 'Tết Nguyên Đán (Day 3)',
        nameVi: 'Tết Nguyên Đán (Mùng 3)',
        descriptionEn: 'Third day of Tết - often considered an unlucky day for visiting. Many families stay home or visit graves of deceased relatives.',
        descriptionVi: 'Ngày mùng 3 Tết - thường được coi là ngày xấu để đi thăm hỏi. Nhiều gia đình ở nhà hoặc đi thăm mộ người thân đã khuất.',
        traditions: 'Ancestral worship, staying home with family',
        offerings: 'Incense, fruits, flowers for ancestors and graves'
    },
    '1/10': {
        nameEn: 'Ngày Giỗ Tổ Hùng Vương (Hung Kings\' Memorial)',
        nameVi: 'Giỗ Tổ Hùng Vương',
        descriptionEn: 'Memorial day for the Hung Kings, legendary founders of Vietnam. A national holiday honoring Vietnamese origins.',
        descriptionVi: 'Ngày giỗ các Vua Hùng, tổ tiên huyền thoại của Việt Nam. Ngày lễ quốc gia tưởng nhớ nguồn gốc dân tộc.',
        traditions: 'Temple pilgrimages, offerings, patriotic ceremonies',
        offerings: 'Bánh chưng, bánh dày, five-fruit tray, flowers, incense'
    },
    '1/15': {
        nameEn: 'Tết Nguyên Tiêu (Lantern Festival)',
        nameVi: 'Tết Nguyên Tiêu (Rằm tháng Giêng)',
        descriptionEn: 'First full moon of the lunar year. Festival of lights with colorful lanterns, lion dances, and releasing lanterns on water to honor ancestors.',
        descriptionVi: 'Trăng tròn đầu tiên của năm âm lịch. Lễ hội ánh sáng với đèn lồng nhiều màu sắc, múa lân và thả đèn hoa đăng để tưởng nhớ tổ tiên.',
        traditions: 'Lantern displays, lion dances, releasing floating lanterns',
        offerings: 'Five-fruit tray, vegetarian dishes, sweet rice balls (bánh trôi), tea, flowers, incense'
    },
    '3/3': {
        nameEn: 'Tết Hàn Thực (Cold Food Festival)',
        nameVi: 'Tết Hàn Thực',
        descriptionEn: 'Ancient festival honoring ancestors where families traditionally eat cold food. Commemorates loyalty and filial piety.',
        descriptionVi: 'Lễ hội cổ xưa tưởng nhớ tổ tiên, các gia đình ăn đồ ăn lạnh theo truyền thống. Tưởng niệm lòng trung thành và hiếu thảo.',
        traditions: 'Eating cold food, ancestral worship, tomb sweeping',
        offerings: 'Cold rice, fruits, bánh trôi, bánh chay (no cooked food), flowers, incense'
    },
    '4/15': {
        nameEn: 'Lễ Phật Đản (Buddha\'s Birthday)',
        nameVi: 'Lễ Phật Đản (Phật Sinh)',
        descriptionEn: 'Celebration of the birth of Gautama Buddha. Buddhists visit pagodas, release birds and fish, and perform acts of kindness.',
        descriptionVi: 'Kỷ niệm ngày sinh của Đức Phật Thích Ca. Phật tử đi chùa, phóng sinh và làm các việc thiện.',
        traditions: 'Temple visits, vegetarian meals, releasing captive animals',
        offerings: 'Vegetarian dishes, fruits, flowers, incense, tea, rice. No meat or fish offerings.'
    },
    '5/5': {
        nameEn: 'Tết Đoan Ngọ (Double Fifth Festival)',
        nameVi: 'Tết Đoan Ngọ (Tết diệt sâu bọ)',
        descriptionEn: 'Festival for killing insects and preventing diseases. Families eat special fruits, drink ruou nep, and wear protective amulets.',
        descriptionVi: 'Tết diệt sâu bọ và phòng tránh bệnh tật. Gia đình ăn trái cây đặc biệt, uống rượu nếp và đeo bùa hộ mệnh.',
        traditions: 'Eating fruits, drinking rice wine, wearing amulets',
        offerings: 'Seasonal fruits (lychee, plums), sticky rice wine (rượu nếp), bánh ú, rice, incense'
    },
    '7/1': {
        nameEn: 'Khai Hội Quỷ (Opening of Ghost Month)',
        nameVi: 'Mở Cửa Địa Ngục',
        descriptionEn: 'Beginning of the Ghost Month when the gates of hell open and spirits roam the earth. Families prepare offerings to appease wandering souls.',
        descriptionVi: 'Đầu tháng Quỷ khi cửa địa ngục mở và các linh hồn lang thang trên trái đất. Gia đình chuẩn bị đồ cúng để xoa dịu các hồn ma.',
        traditions: 'Burning incense, food offerings, avoiding night activities',
        offerings: 'Rice, vegetarian food, fruits, paper money, incense'
    },
    '7/7': {
        nameEn: 'Thất Tịch (Double Seventh Festival)',
        nameVi: 'Thất Tịch (Ngưu Lang Chức Nữ)',
        descriptionEn: 'Vietnamese Valentine\'s Day celebrating the legend of the Cowherd and Weaver Girl who meet once a year on this night.',
        descriptionVi: 'Ngày lễ tình nhân Việt Nam kỷ niệm truyền thuyết Ngưu Lang và Chức Nữ gặp nhau một lần mỗi năm vào đêm này.',
        traditions: 'Romantic celebrations, stargazing, storytelling',
        offerings: 'Fruits, flowers, sweet cakes, tea. Special offerings for couples seeking love.'
    },
    '7/14': {
        nameEn: 'Hungry Ghost Festival Eve',
        nameVi: 'Đêm trước Vu Lan',
        descriptionEn: 'Eve of the Vu Lan festival. Families prepare elaborate offerings for ancestors and wandering spirits.',
        descriptionVi: 'Đêm trước lễ Vu Lan. Gia đình chuẩn bị đồ cúng cho tổ tiên và các hồn ma cô hồn.',
        traditions: 'Preparing offerings, cleaning altars, chanting prayers',
        offerings: 'Full feast, vegetarian dishes, fruits, cakes, tea, wine'
    },
    '7/15': {
        nameEn: 'Lễ Vu Lan (Ullambana Festival)',
        nameVi: 'Lễ Vu Lan (Báo hiếu)',
        descriptionEn: 'Festival honoring parents and ancestors. People wear roses - red for living mothers, white for deceased. Temple ceremonies and charity acts are performed.',
        descriptionVi: 'Lễ hội tưởng nhớ cha mẹ và tổ tiên. Người ta cài hoa hồng - đỏ cho mẹ còn sống, trắng cho mẹ đã mất. Cử hành lễ chùa và làm từ thiện.',
        traditions: 'Wearing roses, temple ceremonies, charity, honoring parents',
        offerings: 'Elaborate vegetarian feast, fruits, cakes, flowers, incense, paper offerings for wandering souls. This is the MOST IMPORTANT day for ancestor worship.'
    },
    '7/29': {
        nameEn: 'Closing of Ghost Month',
        nameVi: 'Đóng Cửa Địa Ngục',
        descriptionEn: 'Last day of Ghost Month when the gates of hell close and spirits return to the underworld.',
        descriptionVi: 'Ngày cuối tháng Quỷ khi cửa địa ngục đóng lại và các linh hồn trở về âm phủ.',
        traditions: 'Final offerings, burning paper items, prayers of closure',
        offerings: 'Rice, fruits, paper offerings, incense'
    },
    '8/15': {
        nameEn: 'Tết Trung Thu (Mid-Autumn Festival)',
        nameVi: 'Tết Trung Thu (Tết Thiếu nhi)',
        descriptionEn: 'Harvest moon festival celebrating children. Families gather to eat mooncakes, carry lanterns, watch lion dances, and enjoy the full moon.',
        descriptionVi: 'Tết trăng rằm mừng trẻ em. Gia đình sum họp ăn bánh trung thu, rước đèn lồng, xem múa lân và ngắm trăng tròn.',
        traditions: 'Mooncakes, lantern processions, lion dances, family gatherings',
        offerings: 'Mooncakes, five-fruit tray, pomelos, persimmons, tea, incense, lanterns'
    },
    '9/9': {
        nameEn: 'Tết Trùng Cửu (Double Ninth Festival)',
        nameVi: 'Tết Trùng Cửu (Tết Trùng Dương)',
        descriptionEn: 'Festival for longevity and health. People climb mountains, drink chrysanthemum wine, and honor the elderly.',
        descriptionVi: 'Lễ hội cầu sức khỏe và trường thọ. Người ta leo núi, uống rượu hoa cúc và tôn kính người cao tuổi.',
        traditions: 'Mountain climbing, chrysanthemum wine, honoring elders',
        offerings: 'Chrysanthemum flowers, wine, fruits, cakes, rice, incense'
    },
    '10/10': {
        nameEn: 'Tết Hạ Nguyên (Lower Nguyen Festival)',
        nameVi: 'Tết Hạ Nguyên (Tết Cơm Mới)',
        descriptionEn: 'Festival of forgiveness and new harvest. Families release water lanterns, pray for peace, and celebrate the new rice harvest.',
        descriptionVi: 'Lễ hội tha thứ và mùa màng mới. Gia đình thả đèn nước, cầu bình an và mừng vụ lúa mới.',
        traditions: 'Water lanterns, new rice offerings, prayer ceremonies',
        offerings: 'New rice, sticky rice cakes, fruits, flowers, incense, water lanterns'
    },
    '12/8': {
        nameEn: 'Lễ Phật Thành Đạo (Buddha\'s Enlightenment)',
        nameVi: 'Lễ Phật Thành Đạo (Lễ Lạp Bát)',
        descriptionEn: 'Commemorating Buddha\'s enlightenment under the Bodhi tree. Buddhists eat special porridge and practice meditation.',
        descriptionVi: 'Tưởng niệm ngày Đức Phật đạt được giác ngộ dưới cây Bồ Đề. Phật tử ăn cháo đặc biệt và tập thiền.',
        traditions: 'Eight-treasure porridge, meditation, temple ceremonies',
        offerings: 'Eight-treasure porridge (cháo lạp bát), vegetarian dishes, fruits, flowers, incense, tea'
    },
    '12/23': {
        nameEn: 'Tết Táo Quân (Kitchen Gods\' Festival)',
        nameVi: 'Tết Táo Quân (Ông Táo về trời)',
        descriptionEn: 'Sending the Kitchen Gods to heaven to report on the family\'s year. Families clean homes, offer carp fish, and prepare for Tết.',
        descriptionVi: 'Tiễn Ông Táo về trời báo cáo về năm của gia đình. Các gia đình dọn dẹp nhà cửa, cúng cá chép và chuẩn bị Tết.',
        traditions: 'Releasing carp fish, cleaning house, offering ceremonies',
        offerings: 'Live carp fish (3), sticky rice, fruits, flowers, paper clothes & hats for Kitchen Gods, incense'
    }
};

// Altar offerings recommendations
const altarOfferings = {
    'first-day': {
        nameEn: 'First Day of Lunar Month',
        nameVi: 'Mùng Một Âm Lịch',
        offerings: 'Fresh flowers, fruits (5-fruit tray), incense, rice, salt, water. Optional: vegetarian dishes, sticky rice, bánh chưng/bánh tét.'
    },
    'full-moon': {
        nameEn: 'Full Moon Day (15th)',
        nameVi: 'Ngày Rằm (Mồng 15)',
        offerings: 'Fresh flowers, five-fruit tray, incense, rice, tea, vegetarian food, sweet soups (chè), sticky rice cakes. This is a very important day for worship.'
    },
    'month-end': {
        nameEn: 'End of Lunar Month',
        nameVi: 'Cuối Tháng Âm Lịch',
        offerings: 'Incense, fruits, rice, water. Simple offerings to close the month and prepare for the new moon.'
    }
};

// Vietnamese Lunar New Year dates (Tết) for multiple years
const lunarNewYearDates = {
    2020: new Date('2020-01-25'),
    2021: new Date('2021-02-12'),
    2022: new Date('2022-02-01'),
    2023: new Date('2023-01-22'),
    2024: new Date('2024-02-10'),
    2025: new Date('2025-01-29'),
    2026: new Date('2026-02-17'),
    2027: new Date('2027-02-06'),
    2028: new Date('2028-01-26'),
    2029: new Date('2029-02-13'),
    2030: new Date('2030-02-03')
};

// Lunar calendar conversion with improved accuracy
function solarToLunar(solarDate) {
    const year = solarDate.getFullYear();
    let lunarNewYear = lunarNewYearDates[year];
    let lunarYear = year;

    if (solarDate < lunarNewYear) {
        lunarNewYear = lunarNewYearDates[year - 1];
        lunarYear = year - 1;
    }

    const daysDiff = Math.floor((solarDate - lunarNewYear) / (1000 * 60 * 60 * 24));
    let daysCount = daysDiff;
    let lunarMonth = 1;

    while (daysCount >= 29) {
        const monthLength = (lunarMonth % 2 === 1) ? 30 : 29;
        if (daysCount >= monthLength) {
            daysCount -= monthLength;
            lunarMonth++;
        } else {
            break;
        }
    }

    const lunarDay = daysCount + 1;

    return {
        year: lunarYear,
        month: Math.max(1, Math.min(12, lunarMonth)),
        day: Math.max(1, Math.min(30, Math.floor(lunarDay)))
    };
}

// Calculate moon phase
function calculateMoonPhase(date) {
    const knownNewMoon = new Date('2000-01-06T18:14:00Z');
    const lunarCycle = 29.530588853;
    const daysSinceKnownNew = (date - knownNewMoon) / (1000 * 60 * 60 * 24);
    const currentCycle = daysSinceKnownNew % lunarCycle;
    return currentCycle / lunarCycle;
}

// Get phase info
function getPhaseInfo(phase) {
    const illumination = Math.abs(Math.cos(phase * 2 * Math.PI));
    let phaseName, description;

    if (phase < 0.03 || phase > 0.97) {
        phaseName = "New Moon";
        description = "The moon is not visible";
    } else if (phase < 0.22) {
        phaseName = "Waxing Crescent";
        description = "Growing larger";
    } else if (phase < 0.28) {
        phaseName = "First Quarter";
        description = "Half illuminated";
    } else if (phase < 0.47) {
        phaseName = "Waxing Gibbous";
        description = "Still growing";
    } else if (phase < 0.53) {
        phaseName = "Full Moon";
        description = "Fully illuminated";
    } else if (phase < 0.72) {
        phaseName = "Waning Gibbous";
        description = "Shrinking";
    } else if (phase < 0.78) {
        phaseName = "Last Quarter";
        description = "Half illuminated";
    } else {
        phaseName = "Waning Crescent";
        description = "Shrinking";
    }

    return { name: phaseName, description, illumination: Math.round(illumination * 100) };
}

// Update display
function updateDisplay() {
    // Update dates
    document.getElementById('gregorianDate').textContent = currentDate.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const lunarDate = solarToLunar(currentDate);
    document.getElementById('lunarDate').textContent =
        `🌙 Month ${lunarDate.month}, Day ${lunarDate.day}, Year ${lunarDate.year}`;

    // Update moon phase
    const phase = calculateMoonPhase(currentDate);
    const phaseInfo = getPhaseInfo(phase);
    const moonLight = document.getElementById('moonLight');
    const rotation = phase * 360;

    if (phase < 0.5) {
        moonLight.style.background = `linear-gradient(${90 + rotation}deg, #f5f5dc 0%, #f5f5dc 50%, #333 50%, #333 100%)`;
    } else {
        moonLight.style.background = `linear-gradient(${rotation - 90}deg, #333 0%, #333 50%, #f5f5dc 50%, #f5f5dc 100%)`;
    }

    document.getElementById('phaseName').textContent = phaseInfo.name;
    document.getElementById('illumination').textContent = `${phaseInfo.illumination}% Illuminated`;

    // Update events
    const eventContainer = document.getElementById('eventContainer');
    const holidayKey = `${lunarDate.month}/${lunarDate.day}`;

    if (vietnameseHolidays[holidayKey]) {
        const holiday = vietnameseHolidays[holidayKey];
        eventContainer.innerHTML = `
            <div class="event-card">
                <div class="event-title-en">${holiday.nameEn}</div>
                <div class="event-title-vi">${holiday.nameVi}</div>
                <div class="event-description">${holiday.descriptionEn}</div>
                <div class="event-description-vi">${holiday.descriptionVi}</div>
                <div class="section-title">🎭 Traditions</div>
                <div class="section-content">${holiday.traditions}</div>
                ${holiday.offerings ? `
                    <div class="section-title">🙏 Altar Offerings</div>
                    <div class="section-content">${holiday.offerings}</div>
                ` : ''}
            </div>
        `;
    } else {
        let offeringType = null;
        if (lunarDate.day === 1) offeringType = altarOfferings['first-day'];
        else if (lunarDate.day === 15) offeringType = altarOfferings['full-moon'];
        else if (lunarDate.day >= 29) offeringType = altarOfferings['month-end'];

        if (offeringType) {
            eventContainer.innerHTML = `
                <div class="event-card">
                    <div class="event-title-en">${offeringType.nameEn}</div>
                    <div class="event-title-vi">${offeringType.nameVi}</div>
                    <div class="section-title">🙏 Recommended Offerings</div>
                    <div class="section-content">${offeringType.offerings}</div>
                </div>
            `;
        } else {
            eventContainer.innerHTML = '';
        }
    }

    // Schedule notification for this day if notifications are enabled
    scheduleNotification();
}

function changeDate(days) {
    currentDate.setDate(currentDate.getDate() + days);
    updateDisplay();
}

function goToToday() {
    currentDate = new Date();
    updateDisplay();
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(reg => console.log('Service Worker registered'))
        .catch(err => console.log('Service Worker registration failed'));
}

// Install prompt
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installPrompt').classList.add('show');
});

document.getElementById('installBtn').addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        deferredPrompt = null;
        document.getElementById('installPrompt').classList.remove('show');
    }
});

// Request notification permission
async function requestNotificationPermission() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }
    return false;
}

// Schedule notification
async function scheduleNotification() {
    const notificationsEnabled = localStorage.getItem('notificationsEnabled');
    if (notificationsEnabled === 'false') return;

    const lunarDate = solarToLunar(new Date());
    const holidayKey = `${lunarDate.month}/${lunarDate.day}`;
    const holiday = vietnameseHolidays[holidayKey];

    if (holiday) {
        // Check if we have permission
        if (Notification.permission === 'granted') {
            // Calculate time until 8am today
            const now = new Date();
            const scheduledTime = new Date(now);
            scheduledTime.setHours(8, 0, 0, 0);

            // If 8am has passed, schedule for tomorrow
            if (scheduledTime <= now) {
                scheduledTime.setDate(scheduledTime.getDate() + 1);
            }

            const timeUntilNotification = scheduledTime - now;

            // Schedule notification
            setTimeout(() => {
                if (Notification.permission === 'granted') {
                    new Notification(holiday.nameEn, {
                        body: holiday.nameVi + '\n\n' + holiday.descriptionEn.substring(0, 100) + '...',
                        icon: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%23ffd700\'/%3E%3Ctext x=\'50\' y=\'65\' font-size=\'50\' text-anchor=\'middle\' fill=\'%231a1a3e\'%3E🌙%3C/text%3E%3C/svg%3E',
                        badge: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%23ffd700\'/%3E%3C/svg%3E',
                        requireInteraction: false
                    });
                }
            }, timeUntilNotification);
        } else {
            // Show badge to remind user to enable notifications
            document.getElementById('notificationBadge').style.display = 'flex';
        }
    }
}

// Initialize
updateDisplay();

// Check notification permission on load
if (localStorage.getItem('notificationsEnabled') === null) {
    localStorage.setItem('notificationsEnabled', 'true');
}

if (Notification.permission === 'default' && localStorage.getItem('notificationsEnabled') === 'true') {
    requestNotificationPermission();
}
