/* =========================================================================
   TTEUKKEUN — 매움지수 테스트 콘텐츠 데이터
   이 파일만 수정하면 문구 · 이미지 · 레시피가 사이트 전체에 반영됩니다.
   ========================================================================= */

window.TTK = {
  config: {
    // true: 스페인어 아래에 한국어를 함께 표시 / false: 스페인어만 표시
    showKorean: true,
    // true: 퀴즈 카드 아래 뚝배기 일러스트 표시 / false: 숨김
    showQuizMascot: false,
  },

  /* -----------------------------------------------------------------------
     ASSETS — 파일을 assets/ 폴더에 넣고 경로만 적어주세요.
     빈 문자열("")이면 리소그래프 스타일 자리표시자가 표시됩니다.
     ----------------------------------------------------------------------- */
  assets: {
    logo: "assets/logo/tteukkeun-logo.svg",
    characters: {                   // 결과 화면 메인 일러스트 (1080×1080 투명 PNG)
      suave: "assets/characters/result-suave-almejas.png",
      medio: "assets/characters/result-medio-chorizo.png",
      picante: "assets/characters/result-picante-gamjatang.png",
    },
    characterAlt: {                 // 결과 캐릭터 대체 텍스트
      suave: "Polpol sujetando una almeja — 바지락을 안은 폴폴이",
      medio: "Polpol abrazando un chorizo — 초리조를 안은 폴폴이",
      picante: "Polpol rojo con un tenedor — 포크를 든 빨간 폴폴이",
    },
    pairing: {                      // 음료 페어링 이미지 (추후 제공 — 비어 있으면 표시하지 않음)
      suave: "",
      medio: "",
      picante: "",
    },
    hero: {                         // 시작 화면 뚝배기 속 폴폴이 (투명 배경)
      suave: "",
      medio: "",
      picante: "",
    },
    quizMascot: "",                 // 퀴즈 카드 아래 반응하는 캐릭터 (투명 배경)
    food: {                         // 결과/레시피 음식 이미지 (가로 4:3 권장)
      suave: "",                    // 예: "assets/food/almejas.jpg"
      medio: "",
      picante: "",
    },
  },

  /* -----------------------------------------------------------------------
     QUESTIONS — A=1, B=2, C=3 점
     ----------------------------------------------------------------------- */
  questions: [
    {
      es: "¿Cómo te sientes hoy?",
      ko: "오늘 나의 기분은?",
      options: [
        { es: "Estoy tranquilo/a y relajado/a.", ko: "차분하고 편안해." },
        { es: "Estoy de buen humor y con energía.", ko: "적당히 활기차고 기분 좋아!" },
        { es: "¡Estoy lleno/a de energía y emoción!", ko: "에너지가 넘치고 화끈해!" },
      ],
    },
    {
      es: "¿Qué sabor te apetece más ahora?",
      ko: "지금 가장 끌리는 맛은?",
      options: [
        { es: "Un sabor suave y ligero.", ko: "담백하고 깔끔한 맛" },
        { es: "Un sabor sabroso y lleno de umami.", ko: "고소하고 감칠맛 나는 맛" },
        { es: "Un sabor intenso y picante.", ko: "얼얼하고 강렬한 맛" },
      ],
    },
    {
      es: "¿Qué haces cuando tienes estrés?",
      ko: "스트레스를 받았을 때 나는?",
      options: [
        { es: "Me relajo tranquilamente para despejarme.", ko: "조용히 쉬면서 마음을 가라앉힌다." },
        { es: "Como algo rico para animarme.", ko: "맛있는 음식을 먹으며 기분을 전환한다." },
        { es: "¡Libero el estrés haciendo algo emocionante!", ko: "신나는 활동으로 스트레스를 날려버린다!" },
      ],
    },
    {
      // 와이어프레임 문구 기준
      es: "¿Qué prefieres comer con amigos?",
      ko: "친구와 함께 식사한다면?",
      options: [
        { es: "Una comida ligera y agradable.", ko: "부담 없이 즐길 수 있는 편안한 식사" },
        { es: "Una comida abundante con muchos ingredientes.", ko: "다양한 재료가 어우러진 푸짐한 식사" },
        { es: "Una comida con sabores intensos e inolvidables.", ko: "강렬한 맛으로 기억에 남는 식사" },
      ],
    },
    {
      es: "¿Qué necesitas hoy?",
      ko: "오늘 나에게 필요한 한 가지는?",
      options: [
        { es: "Un poco de consuelo y descanso.", ko: "따뜻한 위로와 휴식" },
        { es: "Energía y vitalidad.", ko: "든든한 에너지와 활력" },
        { es: "Una experiencia intensa para liberar tensiones.", ko: "답답함을 날려줄 짜릿함" },
      ],
    },
  ],

  /* -----------------------------------------------------------------------
     RESULT TYPES — 점수 구간 (총점 5~15)
     desc / food.blurb 는 브리프의 성격 키워드로 쓴 초안입니다. 자유롭게 수정하세요.
     ----------------------------------------------------------------------- */
  types: {
    suave: {
      min: 5, max: 8, level: 1,
      name: "SUAVE", ko: "순한맛",
      tagline: {
        es: "¡Hoy necesitas un plato suave y reconfortante!",
        ko: "오늘은 부드럽고 편안한 한 끼가 필요해!",
      },
      desc: {
        es: "Vas a tu ritmo y sin prisas. Hoy te sienta bien algo limpio y ligero, de esos platos que calientan por dentro.",
        ko: "차분하고 여유로운 하루. 담백하고 깔끔한 맛으로 속까지 편안하게 데워요.",
      },
      food: {
        es: "Almejas al vapor con makgeolli",
        ko: "바지락 술찜",
        blurb: {
          es: "Almejas al vapor con makgeolli, el vino de arroz coreano. Un caldo limpio y suave.",
          ko: "막걸리로 쪄낸 바지락. 맑고 부드러운 국물.",
        },
      },
    },
    medio: {
      min: 9, max: 12, level: 2,
      name: "MEDIO", ko: "중간맛",
      tagline: {
        es: "¡Un toque picante y mucho sabor es justo lo que necesitas!",
        ko: "적당한 매콤함과 든든함이 딱 좋아!",
      },
      desc: {
        es: "Ni mucho ni poco: lo tuyo es el equilibrio. Un punto de picante, mucho umami y un plato que te deje con energía.",
        ko: "부드러움과 강렬함 사이, 딱 좋은 균형. 감칠맛 나는 든든한 한 끼로 활기를 채워요.",
      },
      food: {
        es: "Guiso de tofu con chorizo",
        ko: "초리조 두부찌개",
        blurb: {
          es: "El jjigae coreano de tofu se encuentra con el chorizo español.",
          ko: "한국의 두부찌개가 스페인의 초리조를 만났어요.",
        },
      },
    },
    picante: {
      min: 13, max: 15, level: 3,
      name: "PICANTE", ko: "매운맛",
      tagline: {
        es: "¡Un plato intenso para darle sabor al día!",
        ko: "화끈하게 끓여야 오늘 하루가 풀리지!",
      },
      desc: {
        es: "¡Hoy vas a tope! Te pide el cuerpo sabores intensos, muchos ingredientes y un caldo con carácter.",
        ko: "에너지가 넘치는 오늘! 풍부한 재료와 진한 국물로 화끈하게 풀어요.",
      },
      food: {
        es: "Patatas a la riojana al estilo gamjatang",
        ko: "파타타스 감자탕",
        blurb: {
          es: "Las patatas a la riojana, reinterpretadas como un gamjatang intenso y picante.",
          ko: "리오하식 감자 스튜를 진하고 매운 감자탕으로.",
        },
      },
    },
  },

  /* -----------------------------------------------------------------------
     RECIPES — 뜨끈 퓨전 레시피 (2인분 기준)
     레시피 페이지는 한국어를 먼저, 스페인어를 아래에 표시합니다.
     null 인 항목은 "준비 중" 자리표시자로 표시됩니다.
     ----------------------------------------------------------------------- */
  recipeNote: {
    ko: "뜨끈의 퓨전 레시피 · 한국의 뚝배기 음식과 스페인의 식재료 및 요리 문화를 결합했어요.",
    es: "Receta fusión de TTEUKKEUN: la cocina coreana en ttukbaegi se encuentra con los ingredientes y la cocina de España.",
  },

  recipes: {
    /* ---------------- 03 · SUAVE ---------------- */
    suave: {
      name: { ko: "뚝배기 바지락 술찜", es: "Makgeolli Clam Tang" },
      intro: [
        { ko: "한국식 바지락 술찜과 스페인의 알메하스 알 라 마리네라(Almejas a la marinera)를 결합한 퓨전 요리다.",
          es: "Una fusión entre el bajirak suljjim coreano —almejas al vapor con licor de arroz— y las almejas a la marinera." },
        { ko: "바지락을 마늘과 올리브오일로 볶고 막걸리와 육수를 더해 시원하고 깊은 국물을 완성한다. 스페인식 해산물 요리의 풍미와 한국식 술찜의 칼칼하고 개운한 맛을 함께 즐길 수 있다.",
          es: "Salteamos las almejas con ajo y aceite de oliva, y con makgeolli y caldo conseguimos un caldo fresco y profundo. El sabor de la cocina marinera española y el toque ligeramente picante y reconfortante del suljjim coreano, juntos en un mismo plato." },
      ],
      time: { ko: "약 25~35분", es: "25–35 min aprox." },
      timeExtra: { ko: "해감 1~2시간 별도", es: "+ 1–2 h para desarenar" },
      servings: { ko: "2인분", es: "2 personas" },
      features: { ko: "시원함, 담백함, 은은한 칼칼함", es: "Refrescante, ligero, con un picor suave" },
      ingredients: [
        { group: { ko: "주재료", es: "Ingredientes principales" }, items: [
          { ko: "바지락 500g", es: "Almejas, 500 g" },
          { ko: "막걸리 150ml", es: "Makgeolli (vino de arroz coreano), 150 ml" },
          { ko: "물 또는 무염 육수 250ml", es: "Agua o caldo sin sal, 250 ml" },
          { ko: "마늘 5~6쪽", es: "Ajo, 5–6 dientes" },
          { ko: "양파 1/4개", es: "Cebolla, 1/4" },
          { ko: "대파 1/2대", es: "Cebolleta o puerro, 1/2 tallo" },
          { ko: "청양고추 1개", es: "Chile verde picante (cheongyang), 1" },
          { ko: "레몬 1/4개", es: "Limón, 1/4" },
          { ko: "올리브오일 1큰술", es: "Aceite de oliva, 1 cda." },
        ] },
        { group: { ko: "양념", es: "Condimentos" }, items: [
          { ko: "국간장 1작은술", es: "Salsa de soja para sopa (guk-ganjang), 1 cdta." },
          { ko: "고춧가루 1/2작은술", es: "Gochugaru (chile coreano en copos), 1/2 cdta." },
          { ko: "후추 약간", es: "Pimienta, una pizca" },
          { ko: "소금 약간 (필요한 경우에만)", es: "Sal, una pizca (solo si hace falta)" },
        ] },
      ],
      steps: [
        { title: { ko: "바지락 해감", es: "Desarena las almejas" },
          ko: "바지락은 소금물에 담가 약 1~2시간 해감한다. 해감이 끝나면 흐르는 물에 껍데기를 깨끗하게 씻는다.",
          es: "Deja las almejas en agua con sal durante 1–2 horas para que suelten la arena. Después, lava bien las conchas bajo el grifo." },
        { title: { ko: "마늘과 양파 볶기", es: "Sofríe el ajo y la cebolla" },
          ko: "뚝배기에 올리브오일을 두르고 편으로 썬 마늘과 양파를 넣어 중약불에서 볶는다. 마늘의 향이 올라오고 양파가 투명해지기 시작하면 다음 단계로 넘어간다.",
          es: "Pon el aceite de oliva en el ttukbaegi y sofríe a fuego medio-bajo el ajo laminado y la cebolla. Cuando el ajo empiece a oler y la cebolla se vuelva transparente, pasa al siguiente paso." },
        { title: { ko: "막걸리와 육수 넣기", es: "Añade el makgeolli y el caldo" },
          ko: "막걸리 150ml와 물 또는 무염 육수 250ml를 넣는다. 국간장, 고춧가루, 후추를 더하고 끓인다.",
          es: "Vierte 150 ml de makgeolli y 250 ml de agua o caldo sin sal. Añade la soja para sopa, el gochugaru y la pimienta, y lleva a ebullición." },
        { title: { ko: "바지락 넣기", es: "Añade las almejas" },
          ko: "국물이 끓기 시작하면 바지락을 넣고 뚜껑을 덮는다. 바지락이 입을 벌릴 때까지 약 4~6분간 끓인다.",
          es: "Cuando el caldo empiece a hervir, añade las almejas y tapa. Deja cocer unos 4–6 minutos, hasta que se abran." },
        { title: { ko: "마무리", es: "Toque final" },
          ko: "대파와 청양고추를 넣고 레몬즙을 살짝 더한다. 국물 맛을 확인한 뒤 필요하면 소금을 조금 넣어 마무리한다.",
          es: "Añade la cebolleta y el chile verde, y unas gotas de zumo de limón. Prueba el caldo y, si hace falta, termina con una pizca de sal." },
      ],
      tips: [
        { ko: "바지락은 충분히 해감해야 모래가 씹히지 않고 깔끔한 국물을 만들 수 있다.",
          es: "Desarena bien las almejas: así no notarás arena y el caldo quedará limpio." },
        { ko: "올리브오일에 마늘을 먼저 볶으면 스페인식 해산물 요리의 향긋한 풍미를 더할 수 있다.",
          es: "Sofreír primero el ajo en aceite de oliva aporta el aroma de la cocina marinera española." },
        { ko: "바지락 자체에서 짠맛이 나오므로 소금은 마지막에 맛을 본 뒤 넣는다.",
          es: "Las almejas ya sueltan sal: prueba el caldo al final antes de añadirla." },
        { ko: "레몬은 마지막에 넣어야 산뜻한 향을 유지할 수 있다.",
          es: "Añade el limón al final para conservar su aroma fresco." },
        { ko: "조리 후에도 입을 열지 않은 바지락은 먹지 않는다. 껍데기가 깨졌거나 상태가 의심스러운 바지락도 사용하지 않는다.",
          es: "No comas las almejas que sigan cerradas después de cocinarlas. Tampoco uses almejas con la concha rota o de aspecto dudoso." },
        { ko: "막걸리를 사용하더라도 조리 과정에서 알코올이 완전히 사라진다고 보장할 수 없으므로 음주를 피해야 하는 경우에는 막걸리 대신 무알코올 육수를 사용한다.",
          es: "No se puede garantizar que el alcohol del makgeolli se evapore por completo al cocinar. Si debes evitar el alcohol, sustitúyelo por caldo sin alcohol." },
      ],
      pairing: { name: "Fino / Manzanilla",
        ko: "짭짤하고 드라이한 풍미가 바지락의 시원한 맛과 잘 어울리는 스페인 셰리 와인",
        es: "Vinos de Jerez de perfil salino y seco que acompañan de maravilla el frescor de las almejas." },
    },

    /* ---------------- 02 · MEDIO ---------------- */
    medio: {
      name: { ko: "뚝배기 초리소 두부찌개", es: "Guiso de tofu con chorizo" },
      intro: [
        { ko: "한국의 순두부찌개와 스페인의 초리소를 결합한 퓨전 요리다.",
          es: "Una fusión entre el sundubu jjigae coreano —el guiso de tofu extrasuave— y el chorizo español." },
        { ko: "부드럽고 몽글몽글한 순두부에 초리소의 짭짤하고 진한 풍미를 더해 익숙하면서도 새로운 맛을 완성했다. 부드러운 두부와 매콤한 국물의 조화가 특징이다.",
          es: "Al tofu tierno y esponjoso le sumamos el sabor salado e intenso del chorizo: un plato familiar y nuevo a la vez. Lo mejor es el contraste entre la suavidad del tofu y el caldo picantito." },
      ],
      time: { ko: "약 25~30분", es: "25–30 min aprox." },
      servings: { ko: "2인분", es: "2 personas" },
      features: { ko: "부드러움, 감칠맛, 적당한 매콤함", es: "Suave, sabroso, picante en su punto" },
      ingredients: [
        { group: { ko: "주재료", es: "Ingredientes principales" }, items: [
          { ko: "순두부 350g", es: "Sundubu (tofu extrasuave coreano), 350 g" },
          { ko: "스페인 초리소(Chorizo) 70~80g", es: "Chorizo, 70–80 g" },
          { ko: "양파 1/4개", es: "Cebolla, 1/4" },
          { ko: "애호박 1/4개", es: "Calabacín, 1/4" },
          { ko: "표고버섯 또는 양송이버섯 2개", es: "Setas shiitake o champiñones, 2" },
          { ko: "대파 1/2대", es: "Cebolleta o puerro, 1/2 tallo" },
          { ko: "달걀 1개", es: "Huevo, 1" },
          { ko: "물 또는 무염 육수 450ml", es: "Agua o caldo sin sal, 450 ml" },
          { ko: "식용유 1작은술", es: "Aceite, 1 cdta." },
        ] },
        { group: { ko: "양념", es: "Condimentos" }, items: [
          { ko: "고춧가루 1큰술", es: "Gochugaru (chile coreano en copos), 1 cda." },
          { ko: "고추장 1/2큰술", es: "Gochujang (pasta de pimiento coreana), 1/2 cda." },
          { ko: "다진 마늘 1큰술", es: "Ajo picado, 1 cda." },
          { ko: "국간장 1큰술", es: "Salsa de soja para sopa (guk-ganjang), 1 cda." },
          { ko: "참기름 1작은술", es: "Aceite de sésamo, 1 cdta." },
          { ko: "후추 약간", es: "Pimienta, una pizca" },
        ] },
      ],
      steps: [
        { title: { ko: "재료 손질", es: "Prepara los ingredientes" },
          ko: "초리소는 얇게 썰고 양파, 애호박, 버섯은 먹기 좋은 크기로 자른다. 대파는 송송 썰어 준비한다.",
          es: "Corta el chorizo en rodajas finas y la cebolla, el calabacín y las setas en trozos de bocado. Pica la cebolleta en aros finos." },
        { title: { ko: "초리소 볶기", es: "Sofríe el chorizo" },
          ko: "뚝배기에 식용유를 두르고 초리소를 중약불에서 볶는다. 초리소에서 붉은 기름이 나오면 다진 마늘과 고춧가루를 넣어 향을 낸다.",
          es: "Pon el aceite en el ttukbaegi y sofríe el chorizo a fuego medio-bajo. Cuando suelte su aceite rojo, añade el ajo picado y el gochugaru para que desprendan su aroma." },
        { title: { ko: "양념과 채소 넣기", es: "Añade el aliño y las verduras" },
          ko: "고추장을 넣어 가볍게 볶은 뒤 양파, 애호박, 버섯을 넣는다. 물 또는 무염 육수 450ml와 국간장을 넣고 끓인다.",
          es: "Incorpora el gochujang, rehoga un momento y añade la cebolla, el calabacín y las setas. Vierte 450 ml de agua o caldo sin sal y la soja para sopa, y lleva a ebullición." },
        { title: { ko: "순두부 넣기", es: "Añade el tofu" },
          ko: "국물이 끓으면 순두부를 큼직하게 떠 넣는다. 두부가 부서지지 않도록 살살 섞고 약 3~4분간 끓인다.",
          es: "Cuando el caldo hierva, añade el sundubu a cucharadas grandes. Remueve con suavidad para que no se rompa y deja cocer unos 3–4 minutos." },
        { title: { ko: "마무리", es: "Toque final" },
          ko: "달걀을 넣고 대파와 참기름을 올린다. 후추를 약간 뿌리고 약 2분간 더 끓이면 완성된다.",
          es: "Casca el huevo y añade la cebolleta y el aceite de sésamo. Espolvorea un poco de pimienta y deja cocer unos 2 minutos más. ¡Listo!" },
      ],
      tips: [
        { ko: "초리소를 먼저 볶으면 별도의 고추기름 없이도 풍부한 붉은 기름과 향을 낼 수 있다.",
          es: "Si sofríes primero el chorizo, obtienes un aceite rojo lleno de aroma sin necesidad de aceite de chile." },
        { ko: "초리소의 짠맛과 매운맛이 제품마다 다르므로 국간장은 국물 맛을 보며 조절한다.",
          es: "El punto de sal y de picante cambia según el chorizo, así que ajusta la soja para sopa probando el caldo." },
        { ko: "순두부는 너무 많이 저으면 형태가 무너지므로 마지막 단계에서 조심스럽게 넣는다.",
          es: "Si remueves demasiado el sundubu, se deshace: añádelo con cuidado en el último paso." },
        { ko: "달걀을 넣은 뒤 너무 오래 끓이지 않으면 부드러운 식감을 유지할 수 있다.",
          es: "No cuezas demasiado el huevo una vez añadido; así conserva su textura suave." },
        { ko: "스페인에서 한국식 순두부를 구하기 어렵다면 부드러운 연두부를 활용할 수 있다.",
          es: "Si en España no encuentras sundubu coreano, puedes usar tofu sedoso (tipo silken)." },
      ],
      pairing: { name: "Albariño",
        ko: "산뜻한 산미가 초리소의 진한 풍미와 잘 어울리는 스페인 화이트 와인",
        es: "Un blanco español cuya acidez fresca equilibra el sabor intenso del chorizo." },
    },

    /* ---------------- 01 · PICANTE ---------------- */
    picante: {
      name: { ko: "뚝배기 파타타스 감자탕", es: "Patatas Gamjatang" },
      intro: [
        { ko: "스페인의 전통적인 감자 요리인 파타타스 아 라 리오하나(Patatas a la Riojana)와 한국의 감자탕을 결합한 퓨전 요리다.",
          es: "Una fusión entre las patatas a la riojana, el clásico guiso español, y el gamjatang coreano." },
        { ko: "스페인식 초리소의 깊고 진한 풍미에 한국식 감자탕의 얼큰한 양념과 들깨의 고소함을 더했다. 돼지고기와 감자가 푹 익은 진한 국물을 뚝배기에 담아 오랫동안 따뜻하게 즐길 수 있다.",
          es: "Al sabor profundo del chorizo le sumamos el aliño picante del gamjatang y el toque tostado de la perilla. Cerdo y patatas bien guisados en un caldo intenso que, servido en ttukbaegi, se mantiene caliente hasta la última cucharada." },
      ],
      time: { ko: "약 50~60분", es: "50–60 min aprox." },
      servings: { ko: "2인분", es: "2 personas" },
      features: { ko: "얼큰함, 깊은 감칠맛, 든든함", es: "Picante, umami profundo, contundente" },
      ingredients: [
        { group: { ko: "주재료", es: "Ingredientes principales" }, items: [
          { ko: "돼지고기 목살 또는 앞다리살 250g", es: "Aguja o paleta de cerdo, 250 g" },
          { ko: "스페인 초리소(Chorizo) 80g", es: "Chorizo, 80 g" },
          { ko: "감자 2개", es: "Patatas, 2" },
          { ko: "양파 1/2개", es: "Cebolla, 1/2" },
          { ko: "양배추 또는 배추 100g", es: "Repollo o col china, 100 g" },
          { ko: "대파 1/2대", es: "Cebolleta o puerro, 1/2 tallo" },
          { ko: "깻잎 5~6장", es: "Hojas de perilla, 5–6" },
          { ko: "물 또는 무염 육수 650ml", es: "Agua o caldo sin sal, 650 ml" },
        ] },
        { group: { ko: "양념", es: "Condimentos" }, items: [
          { ko: "고추장 1큰술", es: "Gochujang (pasta de pimiento coreana), 1 cda." },
          { ko: "된장 1/2큰술", es: "Doenjang (pasta de soja coreana), 1/2 cda." },
          { ko: "고춧가루 1큰술", es: "Gochugaru (chile coreano en copos), 1 cda." },
          { ko: "다진 마늘 1큰술", es: "Ajo picado, 1 cda." },
          { ko: "간장 1큰술", es: "Salsa de soja, 1 cda." },
          { ko: "들깻가루 1.5큰술", es: "Semillas de perilla molidas, 1,5 cdas." },
          { ko: "후추 약간", es: "Pimienta, una pizca" },
          { ko: "식용유 약간", es: "Aceite, un chorrito" },
        ] },
      ],
      steps: [
        { title: { ko: "재료 손질", es: "Prepara los ingredientes" },
          ko: "돼지고기는 먹기 좋은 크기로 자르고, 초리소는 얇게 썬다. 감자는 큼직하게 썰고 양파와 양배추는 적당한 크기로 손질한다. 대파와 깻잎도 준비한다.",
          es: "Corta el cerdo en trozos de bocado y el chorizo en rodajas finas. Trocea las patatas en trozos grandes y corta la cebolla y el repollo a un tamaño cómodo. Ten listas también la cebolleta y las hojas de perilla." },
        { title: { ko: "고기와 초리소 볶기", es: "Sofríe la carne y el chorizo" },
          ko: "뚝배기에 식용유를 조금 두르고 초리소를 먼저 볶아 붉은 기름과 풍미를 낸다. 돼지고기를 넣고 겉면이 노릇해질 때까지 함께 볶는다.",
          es: "Pon un poco de aceite en el ttukbaegi y sofríe primero el chorizo para que suelte su aceite rojo y su sabor. Añade el cerdo y dóralo junto con el chorizo." },
        { title: { ko: "양념 넣기", es: "Añade el aliño" },
          ko: "고추장, 된장, 고춧가루, 다진 마늘, 간장을 넣고 고기와 초리소에 양념이 잘 배도록 볶는다.",
          es: "Incorpora el gochujang, el doenjang, el gochugaru, el ajo picado y la salsa de soja, y rehoga para que la carne y el chorizo se impregnen bien." },
        { title: { ko: "채소와 육수 넣기", es: "Añade las verduras y el caldo" },
          ko: "감자, 양파, 양배추를 넣고 물 또는 무염 육수 650ml를 부어 끓인다. 끓기 시작하면 중약불로 줄여 감자와 고기가 충분히 익을 때까지 약 20~25분간 끓인다.",
          es: "Agrega las patatas, la cebolla y el repollo, y vierte 650 ml de agua o caldo sin sal. Cuando rompa a hervir, baja a fuego medio-bajo y deja cocer unos 20–25 minutos, hasta que las patatas y la carne estén bien hechas." },
        { title: { ko: "마무리", es: "Toque final" },
          ko: "들깻가루를 넣고 잘 섞은 뒤 대파와 깻잎을 올린다. 한소끔 더 끓여 완성한다.",
          es: "Añade la perilla molida, mezcla bien y coloca encima la cebolleta y las hojas de perilla. Deja que dé un último hervor y listo." },
      ],
      tips: [
        { ko: "초리소를 먼저 볶으면 초리소 특유의 파프리카 향과 붉은 기름이 국물에 자연스럽게 배어든다.",
          es: "Si sofríes primero el chorizo, su aroma a pimentón y su aceite rojo se integran de forma natural en el caldo." },
        { ko: "초리소마다 염도가 다르므로 간장은 처음부터 모두 넣기보다 국물 맛을 보며 조절해도 좋다.",
          es: "Cada chorizo tiene un punto de sal distinto: en lugar de echar toda la soja al principio, ve ajustando mientras pruebas el caldo." },
        { ko: "감자는 너무 작게 자르지 않아야 오래 끓여도 형태가 잘 유지된다.",
          es: "No cortes las patatas demasiado pequeñas; así mantienen la forma aunque cuezan mucho rato." },
        { ko: "들깻가루와 깻잎은 마지막에 넣어야 고소한 향을 살릴 수 있다.",
          es: "Añade la perilla molida y las hojas al final para conservar su aroma tostado." },
        { ko: "뚝배기는 열을 오래 유지하므로 불을 끈 뒤에도 뜨거울 수 있다. 마지막 간은 불을 끄기 전에 확인한다.",
          es: "El ttukbaegi conserva el calor mucho tiempo y sigue muy caliente aunque apagues el fuego. Rectifica la sal antes de apagarlo." },
      ],
      pairing: { name: "Rioja Crianza",
        ko: "초리소와 돼지고기의 진한 풍미에 잘 어울리는 스페인 레드 와인",
        es: "Un tinto español que acompaña de maravilla el sabor intenso del chorizo y el cerdo." },
    },
  },
};
