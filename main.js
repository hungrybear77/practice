const MODEL_BASE = 'https://teachablemachine.withgoogle.com/models/vuvsdVGC3/';
const MODEL_URL = `${MODEL_BASE}model.json`;
const METADATA_URL = `${MODEL_BASE}metadata.json`;

let model = null;
let maxPredictions = 0;
let webcam = null;
let webcamLoopId = null;
let activeImage = null;

const statusEl = document.getElementById('model-status');
const labelCountEl = document.getElementById('label-count');
const resultNote = document.getElementById('result-note');
const predictionsEl = document.getElementById('predictions');
const imageInput = document.getElementById('image-input');
const previewEl = document.getElementById('preview');
const analyzeBtn = document.getElementById('analyze-btn');
const resetBtn = document.getElementById('reset-btn');
const webcamStartBtn = document.getElementById('webcam-start');
const webcamStopBtn = document.getElementById('webcam-stop');
const webcamContainer = document.getElementById('webcam-container');

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

const stopWebcam = () => {
    if (webcam) {
        webcam.stop();
        webcam = null;
    }
    if (webcamLoopId) {
        cancelAnimationFrame(webcamLoopId);
        webcamLoopId = null;
    }
    if (webcamContainer) {
        webcamContainer.innerHTML = '웹캠이 꺼져 있습니다.';
    }
};

const webcamLoop = () => {
    if (!webcam) return;
    webcam.update();
    webcamLoopId = requestAnimationFrame(webcamLoop);
};

const startWebcam = async () => {
    await loadModel();
    stopWebcam();

    try {
        webcam = new tmImage.Webcam(320, 320, true);
        await webcam.setup();
        await webcam.play();

        webcamContainer.innerHTML = '';
        webcamContainer.appendChild(webcam.canvas);
        activeImage = webcam.canvas;
        resultNote.textContent = '웹캠이 켜졌어요. 분석 버튼을 눌러주세요.';

        webcamLoop();
    } catch (error) {
        console.error(error);
        resultNote.textContent = '웹캠 권한을 확인해 주세요.';
    }
};

imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    stopWebcam();
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
        resultNote.textContent = '이미지를 올리거나 웹캠을 시작해 주세요.';
        return;
    }

    await loadModel();
    if (!model) return;

    const predictions = await model.predict(activeImage);
    renderPredictions(predictions);
});

resetBtn.addEventListener('click', () => {
    imageInput.value = '';
    previewEl.innerHTML = '<span>미리보기 영역</span>';
    activeImage = null;
    clearPredictions();
    resultNote.textContent = '이미지를 올리거나 웹캠을 시작해 주세요.';
    stopWebcam();
});

webcamStartBtn.addEventListener('click', startWebcam);
webcamStopBtn.addEventListener('click', stopWebcam);

document.addEventListener('DOMContentLoaded', () => {
    setStatus('모델 로딩 중...');
    loadModel();
    requestAnimationFrame(() => {
        document.body.classList.add('loaded');
    });
});
