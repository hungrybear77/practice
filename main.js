const MODEL_BASE = 'https://teachablemachine.withgoogle.com/models/vuvsdVGC3/';
const MODEL_URL = `${MODEL_BASE}model.json`;
const METADATA_URL = `${MODEL_BASE}metadata.json`;

let model = null;
let maxPredictions = 0;
let activeImage = null;

const statusEl = document.getElementById('model-status');
const labelCountEl = document.getElementById('label-count');
const resultNote = document.getElementById('result-note');
const predictionsEl = document.getElementById('predictions');
const imageInput = document.getElementById('image-input');
const previewEl = document.getElementById('preview');
const analyzeBtn = document.getElementById('analyze-btn');
const resetBtn = document.getElementById('reset-btn');

const setStatus = (message, isError = false) => {
    statusEl.textContent = message;
    statusEl.style.color = isError ? 'var(--accent-strong)' : '';
};

const clearPredictions = () => {
    predictionsEl.innerHTML = '';
};

const renderPredictions = (predictions) => {
    const sorted = [...predictions].sort((a, b) => b.probability - a.probability);
    predictionsEl.innerHTML = '';

    sorted.forEach((prediction, index) => {
        const card = document.createElement('article');
        card.className = 'card is-visible';
        card.style.animationDelay = `${index * 90}ms`;

        const title = document.createElement('h3');
        title.textContent = prediction.className;

        const probability = Math.round(prediction.probability * 100);
        const confidenceRow = document.createElement('div');
        confidenceRow.className = 'confidence-row';
        confidenceRow.innerHTML = `<span>확률</span><span>${probability}%</span>`;

        const bar = document.createElement('div');
        bar.className = 'confidence-bar';
        const barFill = document.createElement('span');
        barFill.style.width = `${probability}%`;
        bar.appendChild(barFill);

        card.appendChild(title);
        card.appendChild(confidenceRow);
        card.appendChild(bar);

        predictionsEl.appendChild(card);
    });

    if (sorted[0]) {
        const top = sorted[0];
        const topPercent = Math.round(top.probability * 100);
        resultNote.textContent = `${top.className}일 확률이 가장 높아요 (${topPercent}%).`;
    }
};

const loadModel = async () => {
    if (model) return;
    setStatus('모델 로딩 중...');
    try {
        model = await tmImage.load(MODEL_URL, METADATA_URL);
        maxPredictions = model.getTotalClasses();
        labelCountEl.textContent = maxPredictions;
        setStatus('모델 준비 완료');
    } catch (error) {
        console.error(error);
        setStatus('모델 로딩에 실패했어요.', true);
    }
};

imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        previewEl.innerHTML = '';
        previewEl.appendChild(img);
        activeImage = img;
        resultNote.textContent = '분석 버튼을 눌러주세요.';
    };
    img.src = objectUrl;
});

analyzeBtn.addEventListener('click', async () => {
    if (!activeImage) {
        resultNote.textContent = '이미지를 올려주세요.';
        return;
    }

    await loadModel();
    if (!model) return;

    const predictions = await model.predict(activeImage);
    renderPredictions(predictions);
});

resetBtn.addEventListener('click', () => {
    imageInput.value = '';
    previewEl.innerHTML = `
        <div class="preview-copy">
            <p class="preview-title">사진을 올려주세요</p>
            <p class="preview-desc">얼굴이 잘 보이는 정면 사진이면 정확도가 올라가요.</p>
        </div>
    `;
    activeImage = null;
    clearPredictions();
    resultNote.textContent = '이미지를 올려주세요.';
});

document.addEventListener('DOMContentLoaded', () => {
    setStatus('모델 로딩 중...');
    loadModel();
    requestAnimationFrame(() => {
        document.body.classList.add('loaded');
    });
});
