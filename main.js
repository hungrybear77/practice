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
const shareTitleEl = document.getElementById('share-title');
const shareDescEl = document.getElementById('share-desc');
const copyStatusEl = document.getElementById('copy-status');
const nativeShareBtn = document.getElementById('native-share-btn');
const copyLinkBtn = document.getElementById('copy-link-btn');
const shareKakao = document.getElementById('share-kakao');
const shareX = document.getElementById('share-x');
const shareFacebook = document.getElementById('share-facebook');

const canonicalHref = document.querySelector('link[rel="canonical"]')?.href;
const shareUrl = canonicalHref || window.location.href;
const defaultShareText = '내 동물상 테스트 결과를 확인하고 너도 바로 해봐!';
const shareMedium = 'social';
const shareCampaign = 'animal_face_viral';
let currentShareText = defaultShareText;

const setStatus = (message, isError = false) => {
    statusEl.textContent = message;
    statusEl.style.color = isError ? 'var(--accent-strong)' : '';
};

const clearPredictions = () => {
    predictionsEl.innerHTML = '';
};

const setCopyStatus = (message, isError = false) => {
    if (!copyStatusEl) return;
    copyStatusEl.textContent = message;
    copyStatusEl.style.color = isError ? 'var(--accent-strong)' : '';
};

const updateShareLinks = (shareText) => {
    const text = encodeURIComponent(shareText);
    const xTrackedUrl = encodeURIComponent(buildTrackedUrl('x'));
    const facebookTrackedUrl = encodeURIComponent(buildTrackedUrl('facebook'));
    const kakaoTrackedUrl = encodeURIComponent(buildTrackedUrl('kakao'));

    if (shareX) {
        shareX.href = `https://twitter.com/intent/tweet?text=${text}&url=${xTrackedUrl}`;
    }

    if (shareFacebook) {
        shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${facebookTrackedUrl}&quote=${text}`;
    }

    if (shareKakao) {
        shareKakao.href = `https://story.kakao.com/share?url=${kakaoTrackedUrl}`;
    }
};

const buildTrackedUrl = (source) => {
    try {
        const url = new URL(shareUrl, window.location.origin);
        url.searchParams.set('utm_source', source);
        url.searchParams.set('utm_medium', shareMedium);
        url.searchParams.set('utm_campaign', shareCampaign);
        return url.toString();
    } catch (error) {
        console.error(error);
        return shareUrl;
    }
};

const updateShareContent = (message) => {
    currentShareText = message || defaultShareText;

    if (shareTitleEl) {
        shareTitleEl.textContent = '결과를 친구에게 공유해보세요';
    }

    if (shareDescEl) {
        shareDescEl.textContent = currentShareText;
    }

    updateShareLinks(currentShareText);
};

const copyToClipboard = async (value) => {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
        return;
    }

    const helperInput = document.createElement('textarea');
    helperInput.value = value;
    helperInput.setAttribute('readonly', '');
    helperInput.style.position = 'absolute';
    helperInput.style.left = '-9999px';
    document.body.appendChild(helperInput);
    helperInput.select();
    document.execCommand('copy');
    document.body.removeChild(helperInput);
};

const wireShareActions = () => {
    if (nativeShareBtn) {
        nativeShareBtn.addEventListener('click', async () => {
            const shareData = {
                title: '동물상 테스트 - 강아지 vs 고양이',
                text: currentShareText,
                url: buildTrackedUrl('native_share')
            };

            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                    setCopyStatus('공유창이 열렸어요.');
                } catch (error) {
                    if (error?.name !== 'AbortError') {
                        setCopyStatus('공유를 여는 중 문제가 발생했어요.', true);
                    }
                }
                return;
            }

            try {
                await copyToClipboard(buildTrackedUrl('copy_link'));
                setCopyStatus('링크가 복사되었어요. 친구에게 붙여넣기 해보세요.');
            } catch (error) {
                console.error(error);
                setCopyStatus('링크 복사에 실패했어요.', true);
            }
        });
    }

    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', async () => {
            try {
                await copyToClipboard(buildTrackedUrl('copy_link'));
                setCopyStatus('링크가 복사되었어요. 친구에게 붙여넣기 해보세요.');
            } catch (error) {
                console.error(error);
                setCopyStatus('링크 복사에 실패했어요.', true);
            }
        });
    }
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
        updateShareContent(`내 결과는 ${top.className} ${topPercent}%! 너도 동물상 테스트 해봐.`);
        setCopyStatus('');
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
    updateShareContent(defaultShareText);
    setCopyStatus('');
});

document.addEventListener('DOMContentLoaded', () => {
    setStatus('모델 로딩 중...');
    loadModel();
    updateShareContent(defaultShareText);
    wireShareActions();
    requestAnimationFrame(() => {
        document.body.classList.add('loaded');
    });
});
