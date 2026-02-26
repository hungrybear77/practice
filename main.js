const menus = [
    {
        name: '연어 포케 볼',
        description: '신선한 연어와 라임 드레싱, 아보카도 토핑으로 가볍고 산뜻한 한 그릇.',
        time: 'quick',
        price: 'mid',
        spice: 'mild',
        diet: ['light', 'protein'],
        mood: ['fresh', 'celebrate'],
    },
    {
        name: '트러플 크림 파스타',
        description: '크리미한 소스에 트러플 향을 더한 포근한 저녁 메뉴.',
        time: 'mid',
        price: 'high',
        spice: 'mild',
        diet: ['comfort'],
        mood: ['comfort', 'celebrate'],
    },
    {
        name: '고추장 삼겹 덮밥',
        description: '달큰한 고추장 양념과 구운 삼겹이 만난 든든한 덮밥.',
        time: 'mid',
        price: 'mid',
        spice: 'medium',
        diet: ['protein'],
        mood: ['hearty'],
    },
    {
        name: '버터갈릭 새우구이',
        description: '팬 하나로 완성되는 버터갈릭 풍미의 새우 요리.',
        time: 'quick',
        price: 'high',
        spice: 'mild',
        diet: ['protein', 'light'],
        mood: ['fresh', 'celebrate'],
    },
    {
        name: '매콤 차돌 짬뽕',
        description: '불향 가득한 차돌과 해산물 국물로 얼큰하게.',
        time: 'long',
        price: 'mid',
        spice: 'hot',
        diet: ['protein'],
        mood: ['hearty'],
    },
    {
        name: '허브 치킨 샐러드',
        description: '허브 구이 치킨과 그린 믹스로 산뜻한 저녁.',
        time: 'quick',
        price: 'low',
        spice: 'mild',
        diet: ['light', 'protein'],
        mood: ['fresh'],
    },
    {
        name: '된장 버터 소고기 구이',
        description: '된장의 깊은 감칠맛과 버터 향이 어우러진 고기 요리.',
        time: 'mid',
        price: 'high',
        spice: 'mild',
        diet: ['protein'],
        mood: ['hearty', 'celebrate'],
    },
    {
        name: '비건 토마토 스튜',
        description: '토마토와 채소를 오래 끓여낸 따뜻한 스튜.',
        time: 'long',
        price: 'low',
        spice: 'mild',
        diet: ['vegetarian', 'light'],
        mood: ['comfort'],
    },
    {
        name: '얼큰 순두부 찌개',
        description: '매콤한 국물에 부드러운 순두부가 어울린 집밥.',
        time: 'quick',
        price: 'low',
        spice: 'hot',
        diet: ['light'],
        mood: ['comfort', 'hearty'],
    },
    {
        name: '레몬 크림 리조또',
        description: '상큼한 레몬 제스트가 더해진 크림 리조또.',
        time: 'mid',
        price: 'mid',
        spice: 'mild',
        diet: ['comfort'],
        mood: ['fresh', 'celebrate'],
    },
    {
        name: '스테이크 플래터',
        description: '겉은 바삭, 속은 촉촉한 스테이크와 구운 채소.',
        time: 'long',
        price: 'high',
        spice: 'mild',
        diet: ['protein'],
        mood: ['celebrate', 'hearty'],
    },
    {
        name: '버섯 크림 수프',
        description: '버섯을 듬뿍 넣어 고소하고 부드러운 수프.',
        time: 'quick',
        price: 'low',
        spice: 'mild',
        diet: ['vegetarian', 'light'],
        mood: ['comfort'],
    },
    {
        name: '타이 바질 치킨',
        description: '바질 향과 피시 소스의 감칠맛이 어우러진 태국식 덮밥.',
        time: 'mid',
        price: 'mid',
        spice: 'medium',
        diet: ['protein'],
        mood: ['fresh', 'celebrate'],
    },
    {
        name: '김치 크림 우동',
        description: '김치의 매콤함과 크림의 부드러움이 만난 우동.',
        time: 'quick',
        price: 'mid',
        spice: 'medium',
        diet: ['comfort'],
        mood: ['comfort'],
    },
    {
        name: '멕시칸 치킨 타코',
        description: '라임 살사와 치킨을 곁들인 한입 타코.',
        time: 'quick',
        price: 'mid',
        spice: 'medium',
        diet: ['protein'],
        mood: ['fresh', 'celebrate'],
    },
    {
        name: '버팔로 윙 플래터',
        description: '매콤한 소스에 버무린 바삭한 치킨 윙.',
        time: 'mid',
        price: 'mid',
        spice: 'hot',
        diet: ['protein'],
        mood: ['hearty', 'celebrate'],
    },
    {
        name: '아시안 누들 샐러드',
        description: '상큼한 라이스 누들과 채소가 어우러진 샐러드.',
        time: 'quick',
        price: 'low',
        spice: 'mild',
        diet: ['vegetarian', 'light'],
        mood: ['fresh'],
    },
    {
        name: '훈제 오리 덮밥',
        description: '훈제 오리와 달큰한 소스를 곁들인 덮밥.',
        time: 'mid',
        price: 'mid',
        spice: 'mild',
        diet: ['protein'],
        mood: ['hearty'],
    },
    {
        name: '토마토 바질 피자',
        description: '바삭한 도우에 토마토와 바질을 올린 클래식 피자.',
        time: 'mid',
        price: 'mid',
        spice: 'mild',
        diet: ['vegetarian'],
        mood: ['celebrate', 'comfort'],
    },
    {
        name: '차돌 박이 샤브',
        description: '얇은 차돌과 채소를 국물에 살짝 데친 따뜻한 한 상.',
        time: 'long',
        price: 'high',
        spice: 'mild',
        diet: ['protein'],
        mood: ['comfort', 'hearty'],
    },
    {
        name: '마늘 간장 치킨',
        description: '달큰한 간장 소스에 마늘 향이 가득한 치킨.',
        time: 'mid',
        price: 'mid',
        spice: 'mild',
        diet: ['protein'],
        mood: ['hearty', 'celebrate'],
    },
    {
        name: '와사비 연어 덮밥',
        description: '와사비 간장과 연어의 고급스러운 조합.',
        time: 'quick',
        price: 'high',
        spice: 'medium',
        diet: ['protein', 'light'],
        mood: ['fresh', 'celebrate'],
    },
    {
        name: '시금치 페타 샐러드',
        description: '시금치와 페타 치즈로 만든 고소한 샐러드.',
        time: 'quick',
        price: 'low',
        spice: 'mild',
        diet: ['vegetarian', 'light'],
        mood: ['fresh'],
    },
    {
        name: '갈릭 버터 미트볼',
        description: '육즙 가득한 미트볼에 갈릭 버터 소스.',
        time: 'mid',
        price: 'mid',
        spice: 'mild',
        diet: ['protein'],
        mood: ['hearty'],
    },
    {
        name: '코코넛 커리 야채볼',
        description: '코코넛 밀크로 부드럽게 끓여낸 커리 야채볼.',
        time: 'long',
        price: 'mid',
        spice: 'medium',
        diet: ['vegetarian'],
        mood: ['comfort', 'fresh'],
    },
    {
        name: '유자 닭가슴살 구이',
        description: '유자 소스와 닭가슴살의 깔끔한 조합.',
        time: 'quick',
        price: 'mid',
        spice: 'mild',
        diet: ['protein', 'light'],
        mood: ['fresh'],
    },
    {
        name: '매콤 해물 떡볶이',
        description: '해물과 떡이 어우러진 매콤한 길거리 스타일.',
        time: 'mid',
        price: 'low',
        spice: 'hot',
        diet: ['comfort'],
        mood: ['hearty', 'celebrate'],
    },
    {
        name: '그릴드 채소 플래터',
        description: '채소를 구워 향을 살린 건강한 플래터.',
        time: 'mid',
        price: 'low',
        spice: 'mild',
        diet: ['vegetarian', 'light'],
        mood: ['fresh'],
    },
];

const generateBtn = document.getElementById('generate-btn');
const resetBtn = document.getElementById('reset-btn');
const recommendationsEl = document.getElementById('recommendations');
const resultNote = document.getElementById('result-note');
const menuCount = document.getElementById('menu-count');

const budgetFilter = document.getElementById('budget-filter');
const timeFilter = document.getElementById('time-filter');
const spiceFilter = document.getElementById('spice-filter');
const dietFilter = document.getElementById('diet-filter');
const moodFilter = document.getElementById('mood-filter');

const labels = {
    price: {
        low: '저렴',
        mid: '보통',
        high: '여유롭게',
    },
    time: {
        quick: '30분 이하',
        mid: '30~60분',
        long: '1시간 이상',
    },
    spice: {
        mild: '순한맛',
        medium: '적당히 매움',
        hot: '화끈하게',
    },
    diet: {
        vegetarian: '채식',
        protein: '단백질 든든',
        light: '가볍게',
        comfort: '포근함',
    },
    mood: {
        comfort: '편안함',
        fresh: '상큼함',
        hearty: '든든함',
        celebrate: '기분 업',
    },
};

const shuffle = (array) => {
    const clone = [...array];
    for (let i = clone.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [clone[i], clone[j]] = [clone[j], clone[i]];
    }
    return clone;
};

const getActiveMood = () => {
    const active = moodFilter.querySelector('.chip.is-active');
    return active ? active.dataset.value : 'any';
};

const setActiveMood = (value) => {
    moodFilter.querySelectorAll('.chip').forEach((chip) => {
        chip.classList.toggle('is-active', chip.dataset.value === value);
    });
};

const getFilters = () => ({
    price: budgetFilter.value,
    time: timeFilter.value,
    spice: spiceFilter.value,
    diet: dietFilter.value,
    mood: getActiveMood(),
});

const filterMenus = (filters) =>
    menus.filter((menu) => {
        if (filters.price !== 'any' && menu.price !== filters.price) return false;
        if (filters.time !== 'any' && menu.time !== filters.time) return false;
        if (filters.spice !== 'any' && menu.spice !== filters.spice) return false;
        if (filters.diet !== 'any' && !menu.diet.includes(filters.diet)) return false;
        if (filters.mood !== 'any' && !menu.mood.includes(filters.mood)) return false;
        return true;
    });

const buildCard = (menu, index) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.style.animationDelay = `${index * 90}ms`;

    const title = document.createElement('h3');
    title.textContent = menu.name;

    const description = document.createElement('p');
    description.textContent = menu.description;

    const tagRow = document.createElement('div');
    tagRow.className = 'tag-row';

    const tags = [
        `예산: ${labels.price[menu.price]}`,
        `시간: ${labels.time[menu.time]}`,
        `매운맛: ${labels.spice[menu.spice]}`,
    ];

    tags.forEach((tagText) => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = tagText;
        tagRow.appendChild(tag);
    });

    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = `분위기: ${menu.mood.map((m) => labels.mood[m]).join(', ')}`;

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(tagRow);
    card.appendChild(meta);

    return card;
};

const renderRecommendations = () => {
    const filters = getFilters();
    const filtered = filterMenus(filters);
    const pool = filtered.length > 0 ? filtered : menus;
    const picks = shuffle(pool).slice(0, 3);

    recommendationsEl.innerHTML = '';
    picks.forEach((menu, index) => {
        const card = buildCard(menu, index);
        recommendationsEl.appendChild(card);
        requestAnimationFrame(() => {
            card.classList.add('is-visible');
        });
    });

    if (filtered.length === 0) {
        resultNote.textContent = '조건이 엄격해서 전체 메뉴에서 추천했어요.';
    } else {
        resultNote.textContent = `${filtered.length}가지 중 오늘의 메뉴를 골랐어요.`;
    }
};

moodFilter.addEventListener('click', (event) => {
    const chip = event.target.closest('.chip');
    if (!chip) return;
    setActiveMood(chip.dataset.value);
});

resetBtn.addEventListener('click', () => {
    budgetFilter.value = 'any';
    timeFilter.value = 'any';
    spiceFilter.value = 'any';
    dietFilter.value = 'any';
    setActiveMood('any');
    renderRecommendations();
});

generateBtn.addEventListener('click', renderRecommendations);

document.addEventListener('DOMContentLoaded', () => {
    menuCount.textContent = menus.length;
    setActiveMood('any');
    renderRecommendations();
    requestAnimationFrame(() => {
        document.body.classList.add('loaded');
    });
});
