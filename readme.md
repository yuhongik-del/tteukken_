# TTEUKKEUN — 매움지수 테스트 (¿Qué nivel de picante tienes hoy?)

NFC 키링으로 열리는 뜨끈의 인터랙티브 매움지수 테스트입니다. 빌드 과정이 없는 정적 HTML/CSS/JS 사이트입니다.

## 실행

```bash
cd tteukkeun
python3 -m http.server 8000
```
브라우저에서 http://localhost:8000 을 엽니다. 휴대폰에서 확인하려면 같은 Wi‑Fi에서 `http://<컴퓨터 IP>:8000`으로 접속하세요.

## NFC 키링 URL
정적 호스팅(GitHub Pages, Netlify, Vercel 등)에 폴더를 그대로 올리고, **루트 URL**(예: `https://tteukkeun.example/`)을 NFC 태그에 기록합니다.
화면별 주소: `#/` 시작 · `#/test/1`~`5` 질문 · `#/resultado/suave|medio|picante` 결과 · `#/receta/suave|medio|picante` 레시피.

## 파일 구조
```
index.html          화면 골격 + 아이콘 SVG
css/fonts.css       폰트(사이트에 포함) — Bagel Fat One · Fira Sans Condensed · Pretendard
css/style.css       디자인 시스템 (토큰 → 컴포넌트 → 화면 → 모션)
js/data.js          ★ 질문 · 결과 문구 · 레시피 · 이미지 경로 (여기만 수정)
js/app.js           라우터 · 점수 계산 · 화면 렌더링 · 뚝배기 일러스트
assets/fonts/       폰트 파일
assets/characters/  폴폴이 일러스트를 넣을 곳
assets/food/        음식 사진을 넣을 곳
assets/logo/        로고를 넣을 곳
```

## 에셋 교체 방법
1. 파일을 `assets/` 아래 해당 폴더에 넣습니다.
2. `js/data.js`의 `assets` 항목에 경로를 적습니다. 비어 있으면 자리표시자가 보입니다.

| 항목 | 위치 | 권장 형식 |
|---|---|---|
| 로고 ✅ | `assets.logo` → `assets/logo/tteukkeun-logo.svg` | SVG 원본 그대로 (시작 48px · 결과 44px, 파비콘 겸용) |
| 결과 화면 캐릭터 ✅ | `assets.characters.*` → `assets/characters/result-*.png` | 1080×1080 투명 PNG |
| 음료 페어링 이미지 | `assets.pairing.*` | 비어 있으면 표시하지 않음 |
| 시작 화면 뚝배기 속 캐릭터 | `assets.hero.*` | 투명 PNG, 아래쪽은 국물에 잠기므로 상반신 중심 |
| 퀴즈 카드 아래 반응 캐릭터 | `assets.quizMascot` | 투명 PNG |
| 음식 사진 | `assets.food.*` | 4:3 JPG/WebP, 1600px 이하 |

레시피 3종은 `js/data.js`의 `recipes`에 입력되어 있습니다 (레시피 페이지는 한국어 → 스페인어 순으로 표시).
한국어 병기를 끄려면 `config.showKorean: false`로 바꿉니다.

## 점수 로직
A=1, B=2, C=3 → 총점 5–15 · 5–8 SUAVE / 9–12 MEDIO / 13–15 PICANTE.
