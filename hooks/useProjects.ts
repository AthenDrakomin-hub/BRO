import { useState, useEffect } from 'react';
import type { Project } from '../types';
import { ProjectCategory } from '../types';

const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    category: ProjectCategory.ConflictZone,
    urgency: 'High',
    translations: {
      en: {
        title: 'Emergency Medical Aid in Conflict Zones',
        description: 'Providing critical medical care, surgical services, and psychological support to civilians affected by armed conflict.',
        longDescription: 'In regions torn apart by conflict, access to healthcare is often the first casualty. Our teams work on the frontlines, setting up mobile clinics and field hospitals to treat wounded civilians, perform life-saving surgeries, and offer mental health counseling to those traumatized by violence. We ensure our operations remain neutral and impartial, providing aid based on need alone, regardless of political or religious affiliation. This project focuses on deploying rapid response medical teams to the most volatile areas.',
      },
      zh: {
        title: '冲突地区的紧急医疗援助',
        description: '为受武装冲突影响的平民提供关键的医疗、外科服务和心理支持。',
        longDescription: '在被冲突撕裂的地区，医疗保健往往首当其冲。我们的团队在前线工作，建立流动诊所和战地医院，治疗受伤的平民，进行拯救生命的手术，并为受暴力创伤的人提供心理健康咨询。我们确保我们的行动保持中立和公正，仅根据需求提供援助，不论其政治或宗教信仰。该项目专注于向最不稳定的地区部署快速反应医疗队。',
      },
      'zh-TW': {
        title: '衝突地區的緊急醫療援助',
        description: '為受武裝衝突影響的平民提供關鍵的醫療、外科服務和心理支持。',
        longDescription: '在被衝突撕裂的地區，醫療保健往往首當其衝。我們的團隊在前線工作，建立流動診所和戰地醫院，治療受傷的平民，進行拯救生命的手術，並為受暴力創傷的人提供心理健康諮詢。我們確保我們的行動保持中立和公正，僅根據需求提供援助，不論其政治或宗教信仰。該項目專注於向最不穩定的地區部署快速反應醫療隊。',
      },
      de: {
        title: 'Medizinische Nothilfe in Konfliktzonen',
        description: 'Bereitstellung kritischer medizinischer Versorgung, chirurgischer Dienste und psychologischer Unterstützung für von bewaffneten Konflikten betroffene Zivilisten.',
        longDescription: 'In von Konflikten zerrissenen Regionen ist der Zugang zur Gesundheitsversorgung oft das erste Opfer. Unsere Teams arbeiten an vorderster Front und errichten mobile Kliniken und Feldlazarette, um verwundete Zivilisten zu behandeln, lebensrettende Operationen durchzuführen und den von Gewalt Traumatisierten psychologische Beratung anzubieten. Wir stellen sicher, dass unsere Einsätze neutral und unparteiisch bleiben und Hilfe ausschließlich nach Bedarf leisten, unabhängig von politischer oder religiöser Zugehörigkeit. Dieses Projekt konzentriert sich auf den Einsatz von schnellen medizinischen Reaktionsteams in den unbeständigsten Gebieten.',
      },
      ar: {
        title: 'المساعدات الطبية الطارئة في مناطق النزاع',
        description: 'توفير الرعاية الطبية الحيوية والخدمات الجراحية والدعم النفسي للمدنيين المتضررين من النزاعات المسلحة.',
        longDescription: 'في المناطق التي مزقتها النزاعات، غالبًا ما يكون الوصول إلى الرعاية الصحية هو الضحية الأولى. تعمل فرقنا على الخطوط الأمامية، حيث تقيم عيادات متنقلة ومستشفيات ميدانية لعلاج المدنيين الجرحى، وإجراء العمليات الجراحية المنقذة للحياة، وتقديم المشورة في مجال الصحة العقلية للمتضررين من العنف. نحن نضمن أن تظل عملياتنا محايدة وغير متحيزة، ونقدم المساعدة على أساس الحاجة وحدها، بغض النظر عن الانتماء السياسي أو الديني. يركز هذا المشروع على نشر فرق الاستجابة الطبية السريعة في أكثر المناطق اضطرابًا.',
      },
      fr: {
        title: "Aide Médicale d'Urgence dans les Zones de Conflit",
        description: "Fournir des soins médicaux critiques, des services chirurgicaux et un soutien psychologique aux civils affectés par les conflits armés.",
        longDescription: "Dans les régions déchirées par les conflits, l'accès aux soins de santé est souvent la première victime. Nos équipes travaillent en première ligne, mettant en place des cliniques mobiles et des hôpitaux de campagne pour soigner les civils blessés, effectuer des interventions chirurgicales vitales et offrir des conseils en santé mentale à ceux qui sont traumatisés par la violence. Nous veillons à ce que nos opérations restent neutres et impartiales, en fournissant une aide basée uniquement sur les besoins, sans distinction d'appartenance politique ou religieuse. Ce projet se concentre sur le déploiement d'équipes médicales d'intervention rapide dans les zones les plus instables.",
      },
      es: {
        title: 'Ayuda Médica de Emergencia en Zonas de Conflicto',
        description: 'Proporcionar atención médica crítica, servicios quirúrgicos y apoyo psicológico a los civiles afectados por conflictos armados.',
        longDescription: 'En las regiones devastadas por los conflictos, el acceso a la atención médica es a menudo la primera víctima. Nuestros equipos trabajan en primera línea, estableciendo clínicas móviles y hospitales de campaña para tratar a los civiles heridos, realizar cirugías que salvan vidas y ofrecer asesoramiento de salud mental a los traumatizados por la violencia. Nos aseguramos de que nuestras operaciones permanezcan neutrales e imparciales, proporcionando ayuda basada únicamente en la necesidad, independientemente de la afiliación política o religiosa. Este proyecto se centra en el despliegue de equipos médicos de respuesta rápida en las zonas más volátiles.',
      },
      ru: {
        title: 'Экстренная Медицинская Помощь в Зонах Конфликтов',
        description: 'Предоставление критически важной медицинской помощи, хирургических услуг и психологической поддержки гражданским лицам, пострадавшим от вооруженных конфликтов.',
        longDescription: 'В регионах, раздираемых конфликтами, доступ к здравоохранению часто становится первой жертвой. Наши команды работают на передовой, создавая мобильные клиники и полевые госпитали для лечения раненых гражданских лиц, проведения жизненно важных операций и оказания психологической помощи тем, кто травмирован насилием. Мы обеспечиваем, чтобы наши операции оставались нейтральными и беспристрастными, предоставляя помощь исключительно на основе потребностей, независимо от политической или религиозной принадлежности. Этот проект сосредоточен на развертывании медицинских групп быстрого реагирования в наиболее нестабильных районах.',
      },
      pt: {
        title: 'Ajuda Médica de Emergência em Zonas de Conflito',
        description: 'Fornecer cuidados médicos essenciais, serviços cirúrgicos e apoio psicológico a civis afetados por conflitos armados.',
        longDescription: 'Em regiões devastadas por conflitos, o acesso aos cuidados de saúde é muitas vezes a primeira vítima. As nossas equipas trabalham na linha da frente, montando clínicas móveis e hospitais de campanha para tratar civis feridos, realizar cirurgias que salvam vidas e oferecer aconselhamento de saúde mental aos traumatizados pela violência. Garantimos que as nossas operações permaneçam neutras e imparciais, prestando ajuda com base apenas na necessidade, independentemente da afiliação política ou religiosa. Este projeto concentra-se na implantação de equipas médicas de resposta rápida nas áreas mais voláteis.',
      },
      it: {
        title: "Aiuto Medico d'Emergenza in Zone di Conflitto",
        description: 'Fornire cure mediche critiche, servizi chirurgici e supporto psicologico ai civili colpiti da conflitti armati.',
        longDescription: "Nelle regioni dilaniate dai conflitti, l'accesso all'assistenza sanitaria è spesso la prima vittima. I nostri team lavorano in prima linea, allestendo cliniche mobili e ospedali da campo per curare i civili feriti, eseguire interventi chirurgici salvavita e offrire consulenza sulla salute mentale a coloro che sono traumatizzati dalla violenza. Garantiamo che le nostre operazioni rimangano neutrali e imparziali, fornendo aiuti basati esclusivamente sulla necessità, indipendentemente dall'affiliazione politica o religiosa. Questo progetto si concentra sul dispiegamento di squadre mediche di risposta rapida nelle aree più instabili.",
      }
    },
    goal: 500000,
    raised: 375000,
    imageUrl: 'https://picsum.photos/seed/conflict-zone-medical-aid/600/400',
    location: 'Global Conflict Regions',
    updates: [
        { id: 'u1-1', date: '2024-07-20', imageUrl: 'https://picsum.photos/seed/mobile-clinic-deployed/600/400', translations: { 
            en: { title: 'Mobile Clinic Deployed', content: 'Our first mobile clinic is now operational, providing primary healthcare to over 200 displaced individuals daily.' }, 
            zh: { title: '流动诊所已部署', content: '我们的第一个流动诊所现已投入运营，每天为200多名流离失所者提供初级医疗保健。' },
            'zh-TW': { title: '流動診所已部署', content: '我們的第一個流動診所現已投入運營，每天為200多名流離失所者提供初級醫療保健。' },
            de: { title: 'Mobile Klinik im Einsatz', content: 'Unsere erste mobile Klinik ist nun einsatzbereit und versorgt täglich über 200 Vertriebene mit medizinischer Grundversorgung.' },
            ar: { title: 'تم نشر العيادة المتنقلة', content: 'تعمل عيادتنا المتنقلة الأولى الآن، حيث توفر الرعاية الصحية الأولية لأكثر من 200 نازح يوميًا.' }
        } },
        { id: 'u1-2', date: '2024-07-15', translations: { 
            en: { title: 'Surgical Supplies Arrived', content: 'A shipment of essential surgical supplies has successfully reached our field hospital, enabling us to perform more complex procedures.' }, 
            zh: { title: '外科手术用品已运抵', content: '一批必要的外科手术用品已成功运抵我们的战地医院，使我们能够进行更复杂的手术。' },
            'zh-TW': { title: '外科手術用品已運抵', content: '一批必要的外科手術用品已成功運抵我們的戰地醫院，使我們能夠進行更複雜的手術。' },
            de: { title: 'Chirurgische Versorgungsgüter eingetroffen', content: 'Eine Lieferung wichtiger chirurgischer Versorgungsgüter hat unser Feldlazarett erfolgreich erreicht, sodass wir komplexere Eingriffe durchführen können.' },
            ar: { title: 'وصول الإمدادات الجراحية', content: 'وصلت شحنة من الإمدادات الجراحية الأساسية بنجاح إلى مستشفانا الميداني، مما يمكننا من إجراء عمليات أكثر تعقيدًا.' }
        } },
    ],
    needs: [
        { id: 'n1-1', category: 'Medical', priority: 'High', quantityNeeded: 1000, quantityFulfilled: 600, translations: { 
            en: { name: 'Antibiotic Kits' }, 
            zh: { name: '抗生素套件' },
            'zh-TW': { name: '抗生素套件' },
            de: { name: 'Antibiotika-Kits' },
            ar: { name: 'مجموعات المضادات الحيوية' }
        } },
        { id: 'n1-2', category: 'Personnel', priority: 'High', quantityNeeded: 5, quantityFulfilled: 2, translations: { 
            en: { name: 'Trauma Surgeons' }, 
            zh: { name: '创伤外科医生' },
            'zh-TW': { name: '創傷外科醫生' },
            de: { name: 'Traumachirurgen' },
            ar: { name: 'جراحو الإصابات' }
        } },
        { id: 'n1-3', category: 'Logistics', priority: 'Medium', quantityNeeded: 50, quantityFulfilled: 40, translations: { 
            en: { name: 'Emergency Shelter Tents' }, 
            zh: { name: '应急避难帐篷' },
            'zh-TW': { name: '應急避難帳篷' },
            de: { name: 'Notunterkunftszelte' },
            ar: { name: 'خيام الإيواء الطارئة' }
        } },
    ]
  },
  {
    id: 'p2',
    category: ProjectCategory.DiseaseOutbreak,
    urgency: 'High',
    translations: {
      en: {
        title: 'Cholera Outbreak Response',
        description: 'Deploying rapid response teams to set up treatment centers and implement water sanitation programs.',
        longDescription: 'Cholera, a waterborne disease, can spread rapidly in areas with poor sanitation, leading to severe dehydration and death if left untreated. Our response teams are equipped to quickly establish Cholera Treatment Centers (CTCs) to rehydrate patients and provide antibiotic treatment. A crucial part of our intervention is prevention: we work with communities to improve water sources, distribute hygiene kits, and conduct health promotion campaigns to stop the spread of the disease.',
      },
      zh: {
        title: '霍乱疫情响应',
        description: '部署快速反应小组，建立治疗中心并实施水卫生计划。',
        longDescription: '霍乱是一种水源性疾病，在卫生条件差的地区会迅速传播，如不及时治疗，会导致严重脱水和死亡。我们的应急小组能够迅速建立霍乱治疗中心（CTC），为患者补充水分并提供抗生素治疗。我们干预的一个关键部分是预防：我们与社区合作，改善水源，分发卫生用品包，并开展健康宣传活动，以阻止疾病的传播。',
      },
      'zh-TW': {
        title: '霍亂疫情應對',
        description: '部署快速反應小組，建立治療中心並實施水衛生計劃。',
        longDescription: '霍亂是一種水源性疾病，在衛生條件差的地區會迅速傳播，如不及時治療，會導致嚴重脫水和死亡。我們的應急小組能夠迅速建立霍亂治療中心（CTC），為患者補充水分並提供抗生素治療。我們干預的一個關鍵部分是預防：我們與社區合作，改善水源，分發衛生用品包，並開展健康宣傳活動，以阻止疾病的傳播。',
      },
      de: {
        title: 'Reaktion auf Cholera-Ausbruch',
        description: 'Einsatz von schnellen Reaktionsteams zur Einrichtung von Behandlungszentren und zur Durchführung von Wasser- und Sanitärprogrammen.',
        longDescription: 'Cholera, eine durch Wasser übertragene Krankheit, kann sich in Gebieten mit schlechten sanitären Einrichtungen schnell ausbreiten und unbehandelt zu schwerer Dehydration und zum Tod führen. Unsere Reaktionsteams sind darauf ausgerichtet, schnell Cholera-Behandlungszentren (CTCs) einzurichten, um Patienten zu rehydrieren und eine Antibiotikabehandlung bereitzustellen. Ein entscheidender Teil unserer Intervention ist die Prävention: Wir arbeiten mit den Gemeinden zusammen, um Wasserquellen zu verbessern, Hygienekits zu verteilen und Gesundheitsförderungskampagnen durchzuführen, um die Ausbreitung der Krankheit zu stoppen.',
      },
      ar: {
        title: 'الاستجابة لتفشي الكوليرا',
        description: 'نشر فرق استجابة سريعة لإنشاء مراكز علاج وتنفيذ برامج الصرف الصحي للمياه.',
        longDescription: 'الكوليرا، وهي مرض ينتقل عن طريق المياه، يمكن أن تنتشر بسرعة في المناطق التي تعاني من سوء الصرف الصحي، مما يؤدي إلى الجفاف الشديد والوفاة إذا لم يتم علاجها. فرق الاستجابة لدينا مجهزة لإنشاء مراكز علاج الكوليرا (CTCs) بسرعة لتعويض السوائل للمرضى وتقديم العلاج بالمضادات الحيوية. جزء حاسم من تدخلنا هو الوقاية: نحن نعمل مع المجتمعات لتحسين مصادر المياه، وتوزيع مجموعات النظافة، وتنظيم حملات التوعية الصحية لوقف انتشار المرض.',
      },
      fr: {
        title: "Réponse à l'épidémie de choléra",
        description: "Déploiement d'équipes d'intervention rapide pour mettre en place des centres de traitement et des programmes d'assainissement de l'eau.",
        longDescription: "Le choléra, une maladie d'origine hydrique, peut se propager rapidement dans les zones où l'assainissement est médiocre, entraînant une déshydratation sévère et la mort s'il n'est pas traité. Nos équipes d'intervention sont équipées pour établir rapidement des centres de traitement du choléra (CTC) afin de réhydrater les patients et de fournir un traitement antibiotique. Une partie cruciale de notre intervention est la prévention : nous travaillons avec les communautés pour améliorer les sources d'eau, distribuer des kits d'hygiène et mener des campagnes de promotion de la santé pour arrêter la propagation de la maladie.",
      },
      es: {
        title: 'Respuesta al brote de cólera',
        description: 'Despliegue de equipos de respuesta rápida para establecer centros de tratamiento e implementar programas de saneamiento de agua.',
        longDescription: 'El cólera, una enfermedad transmitida por el agua, puede propagarse rápidamente en áreas con saneamiento deficiente, lo que lleva a una deshidratación grave y la muerte si no se trata. Nuestros equipos de respuesta están equipados para establecer rápidamente Centros de Tratamiento del Cólera (CTC) para rehidratar a los pacientes y proporcionar tratamiento con antibióticos. Una parte crucial de nuestra intervención es la prevención: trabajamos con las comunidades para mejorar las fuentes de agua, distribuir kits de higiene y realizar campañas de promoción de la salud para detener la propagación de la enfermedad.',
      },
      ru: {
        title: 'Реагирование на вспышку холеры',
        description: 'Развертывание групп быстрого реагирования для создания лечебных центров и реализации программ по санитарии воды.',
        longDescription: 'Холера, заболевание, передающееся через воду, может быстро распространяться в районах с плохими санитарными условиями, приводя к тяжелому обезвоживанию и смерти, если ее не лечить. Наши группы реагирования оснащены для быстрого создания Центров лечения холеры (ЦЛХ) для регидратации пациентов и проведения антибиотикотерапии. Важнейшей частью нашего вмешательства является профилактика: мы работаем с сообществами над улучшением источников воды, распространением гигиенических наборов и проведением кампаний по укреплению здоровья, чтобы остановить распространение болезни.',
      },
      pt: {
        title: 'Resposta ao Surto de Cólera',
        description: 'Implantação de equipas de resposta rápida para criar centros de tratamento e implementar programas de saneamento de água.',
        longDescription: 'A cólera, uma doença transmitida pela água, pode espalhar-se rapidamente em áreas com saneamento deficiente, levando a desidratação grave e morte se não for tratada. As nossas equipas de resposta estão equipadas para estabelecer rapidamente Centros de Tratamento de Cólera (CTC) para reidratar os pacientes e fornecer tratamento com antibióticos. Uma parte crucial da nossa intervenção é a prevenção: trabalhamos com as comunidades para melhorar as fontes de água, distribuir kits de higiene e realizar campanhas de promoção da saúde para impedir a propagação da doença.',
      },
      it: {
        title: "Risposta all'epidemia di colera",
        description: "Dispiegamento di squadre di risposta rapida per allestire centri di trattamento e implementare programmi di sanificazione dell'acqua.",
        longDescription: "Il colera, una malattia a trasmissione idrica, può diffondersi rapidamente in aree con scarse condizioni igieniche, portando a grave disidratazione e morte se non trattata. Le nostre squadre di risposta sono attrezzate per istituire rapidamente Centri di Trattamento del Colera (CTC) per reidratare i pazienti e fornire un trattamento antibiotico. Una parte cruciale del nostro intervento è la prevenzione: lavoriamo con le comunità per migliorare le fonti d'acqua, distribuire kit igienici e condurre campagne di promozione della salute per fermare la diffusione della malattia.",
      }
    },
    goal: 250000,
    raised: 110000,
    imageUrl: 'https://picsum.photos/seed/cholera-outbreak-response/600/400',
    location: 'Sub-Saharan Africa',
    updates: [
        { id: 'u2-1', date: '2024-07-18', imageUrl: 'https://picsum.photos/seed/water-purification-system/600/400', translations: { 
            en: { title: 'Water Purification System Installed', content: 'A new large-scale water purification system is now serving three villages, providing clean water to over 5,000 people.' }, 
            zh: { title: '净水系统已安装', content: '一套新的大型净水系统现已为三个村庄提供服务，为5000多人提供清洁用水。' },
            'zh-TW': { title: '淨水系統已安裝', content: '一套新的大型淨水系統現已為三個村莊提供服務，為5000多人提供清潔用水。' },
            de: { title: 'Wasserreinigungssystem installiert', content: 'Ein neues großes Wasserreinigungssystem versorgt nun drei Dörfer und stellt sauberes Wasser für über 5.000 Menschen bereit.' },
            ar: { title: 'تم تركيب نظام تنقية المياه', content: 'يخدم نظام تنقية مياه جديد واسع النطاق الآن ثلاث قرى، ويوفر المياه النظيفة لأكثر من 5000 شخص.' }
        } },
    ],
    needs: [
        { id: 'n2-1', category: 'Medical', priority: 'High', quantityNeeded: 5000, quantityFulfilled: 2500, translations: { 
            en: { name: 'Oral Rehydration Salts (Packs)' }, 
            zh: { name: '口服补液盐（包）' },
            'zh-TW': { name: '口服補液鹽（包）' },
            de: { name: 'Orale Rehydratationssalze (Packungen)' },
            ar: { name: 'أملاح الإماهة الفموية (عبوات)' }
        } },
        { id: 'n2-2', category: 'Logistics', priority: 'Medium', quantityNeeded: 2000, quantityFulfilled: 1500, translations: { 
            en: { name: 'Hygiene Kits' }, 
            zh: { name: '卫生套件' },
            'zh-TW': { name: '衛生套件' },
            de: { name: 'Hygienekits' },
            ar: { name: 'مجموعات النظافة' }
        } },
    ]
  },
  {
    id: 'p3',
    category: ProjectCategory.NaturalDisaster,
    urgency: 'Medium',
    translations: {
        en: {
            title: 'Post-Earthquake Shelter & Medical Support',
            description: 'Delivering emergency shelters, clean water, and medical supplies to communities devastated by recent earthquakes.',
            longDescription: 'When a natural disaster strikes, the immediate aftermath is chaotic and critical. This project focuses on providing the essentials for survival: durable emergency shelters for displaced families, purification systems to ensure access to safe drinking water, and fully-stocked medical kits to treat injuries and prevent disease. Our logistics teams work around the clock to overcome damaged infrastructure and deliver aid to even the most remote and affected communities.',
        },
        zh: {
            title: '地震后住所与医疗支持',
            description: '向遭受近期地震破坏的社区提供紧急住所、清洁水和医疗用品。',
            longDescription: '当自然灾害来袭时，灾后的紧急时刻是混乱且至关重要的。该项目专注于提供生存必需品：为流离失所的家庭提供耐用的紧急住所，确保获取安全饮用水的净化系统，以及用于治疗伤害和预防疾病的储备齐全的医疗包。我们的后勤团队夜以继日地工作，克服受损的基础设施，将援助物资运送到最偏远、受影响最严重的社区。',
        },
        'zh-TW': {
            title: '地震後住所與醫療支持',
            description: '向遭受近期地震破壞的社區提供緊急住所、清潔水和醫療用品。',
            longDescription: '當自然災害來襲時，災後的緊急時刻是混亂且至關重要的。該項目專注於提供生存必需品：為流離失所的家庭提供耐用的緊急住所，確保獲取安全飲用水的淨化系統，以及用於治療傷害和預防疾病的儲備齊全的醫療包。我們的後勤團隊夜以繼日地工作，克服受損的基礎設施，將援助物資運送到最偏遠、受影響最嚴重的社區。',
        },
        de: {
            title: 'Unterkunft & medizinische Unterstützung nach dem Erdbeben',
            description: 'Lieferung von Notunterkünften, sauberem Wasser und medizinischen Hilfsgütern an von den jüngsten Erdbeben zerstörte Gemeinden.',
            longDescription: 'Wenn eine Naturkatastrophe eintritt, ist die unmittelbare Folge chaotisch und kritisch. Dieses Projekt konzentriert sich auf die Bereitstellung der überlebenswichtigen Grundlagen: langlebige Notunterkünfte für vertriebene Familien, Reinigungssysteme zur Gewährleistung des Zugangs zu sauberem Trinkwasser und voll ausgestattete medizinische Kits zur Behandlung von Verletzungen und zur Vorbeugung von Krankheiten. Unsere Logistikteams arbeiten rund um die Uhr, um beschädigte Infrastrukturen zu überwinden und Hilfe auch in die entlegensten und am stärksten betroffenen Gemeinden zu bringen.',
        },
        ar: {
            title: 'المأوى والدعم الطبي بعد الزلزال',
            description: 'توصيل الملاجئ الطارئة والمياه النظيفة والإمدادات الطبية للمجتمعات التي دمرتها الزلازل الأخيرة.',
            longDescription: 'عندما تقع كارثة طبيعية، تكون الفترة التي تليها مباشرة فوضوية وحرجة. يركز هذا المشروع على توفير ضروريات البقاء: ملاجئ طارئة متينة للأسر النازحة، وأنظمة تنقية لضمان الوصول إلى مياه الشرب المأمونة، ومجموعات طبية مجهزة بالكامل لعلاج الإصابات والوقاية من الأمراض. تعمل فرقنا اللوجستية على مدار الساعة للتغلب على البنية التحتية المتضررة وتقديم المساعدات حتى إلى أكثر المجتمعات تضررًا وبعدًا.',
        },
        fr: {
            title: "Abri et soutien médical post-séisme",
            description: "Fourniture d'abris d'urgence, d'eau potable et de fournitures médicales aux communautés dévastées par les récents tremblements de terre.",
            longDescription: "Lorsqu'une catastrophe naturelle survient, les conséquences immédiates sont chaotiques et critiques. Ce projet se concentre sur la fourniture des éléments essentiels à la survie : des abris d'urgence durables pour les familles déplacées, des systèmes de purification pour garantir l'accès à l'eau potable et des kits médicaux complets pour soigner les blessures et prévenir les maladies. Nos équipes logistiques travaillent sans relâche pour surmonter les infrastructures endommagées et acheminer l'aide même dans les communautés les plus reculées et les plus touchées.",
        },
        es: {
            title: 'Refugio y apoyo médico post-terremoto',
            description: 'Entrega de refugios de emergencia, agua potable y suministros médicos a las comunidades devastadas por los recientes terremotos.',
            longDescription: 'Cuando ocurre un desastre natural, las secuelas inmediatas son caóticas y críticas. Este proyecto se centra en proporcionar lo esencial para la supervivencia: refugios de emergencia duraderos para familias desplazadas, sistemas de purificación para garantizar el acceso a agua potable segura y kits médicos completamente abastecidos para tratar lesiones y prevenir enfermedades. Nuestros equipos de logística trabajan día y noche para superar la infraestructura dañada y entregar ayuda incluso a las comunidades más remotas y afectadas.',
        },
        ru: {
            title: 'Убежище и медицинская поддержка после землетрясения',
            description: 'Доставка аварийных убежищ, чистой воды и медикаментов в сообщества, пострадавшие от недавних землетрясений.',
            longDescription: 'Когда происходит стихийное бедствие, непосредственные последствия хаотичны и критичны. Этот проект сосредоточен на предоставлении самого необходимого для выживания: прочных аварийных убежищ для перемещенных семей, систем очистки для обеспечения доступа к безопасной питьевой воде и полностью укомплектованных медицинских наборов для лечения травм и предотвращения заболеваний. Наши логистические команды работают круглосуточно, чтобы преодолеть поврежденную инфраструктуру и доставить помощь даже в самые отдаленные и пострадавшие сообщества.',
        },
        pt: {
            title: 'Abrigo e Apoio Médico Pós-Sismo',
            description: 'Entrega de abrigos de emergência, água potável e suprimentos médicos a comunidades devastadas por sismos recentes.',
            longDescription: 'Quando um desastre natural acontece, as consequências imediatas são caóticas e críticas. Este projeto foca-se em fornecer o essencial para a sobrevivência: abrigos de emergência duráveis para famílias deslocadas, sistemas de purificação para garantir o acesso a água potável e kits médicos completos para tratar ferimentos e prevenir doenças. As nossas equipas de logística trabalham incessantemente para superar infraestruturas danificadas e levar ajuda até às comunidades mais remotas e afetadas.',
        },
        it: {
            title: 'Rifugio e supporto medico post-terremoto',
            description: 'Consegna di rifugi di emergenza, acqua pulita e forniture mediche alle comunità devastate dai recenti terremoti.',
            longDescription: "Quando si verifica un disastro naturale, le conseguenze immediate sono caotiche e critiche. Questo progetto si concentra sulla fornitura degli elementi essenziali per la sopravvivenza: rifugi di emergenza durevoli per le famiglie sfollate, sistemi di purificazione per garantire l'accesso all'acqua potabile e kit medici completi per curare le ferite e prevenire le malattie. I nostri team logistici lavorano giorno e notte per superare le infrastrutture danneggiate e fornire aiuti anche alle comunità più remote e colpite.",
        }
    },
    goal: 750000,
    raised: 650000,
    imageUrl: 'https://picsum.photos/seed/earthquake-shelter-support/600/400',
    location: 'Southeast Asia',
    updates: [],
    needs: [
      { id: 'n3-1', category: 'Logistics', priority: 'High', quantityNeeded: 1000, quantityFulfilled: 850, translations: { 
          en: { name: 'Tarpaulins for Shelter' }, 
          zh: { name: '住所用防水布' },
          'zh-TW': { name: '住所用防水布' },
          de: { name: 'Planen für Unterkünfte' },
          ar: { name: 'أغطية القماش المشمع للمأوى' }
      } },
      { id: 'n3-2', category: 'Medical', priority: 'Medium', quantityNeeded: 2500, quantityFulfilled: 2400, translations: { 
          en: { name: 'First-Aid Kits' }, 
          zh: { name: '急救包' },
          'zh-TW': { name: '急救包' },
          de: { name: 'Erste-Hilfe-Kästen' },
          ar: { name: 'مجموعات الإسعافات الأولية' }
      } },
    ]
  },
  {
    id: 'p4',
    category: ProjectCategory.MalnutritionCrisis,
    urgency: 'Medium',
    translations: {
        en: {
            title: 'Combating Child Malnutrition',
            description: 'Establishing therapeutic feeding centers to treat severely malnourished children and provide nutritional education.',
            longDescription: 'Severe acute malnutrition is a life-threatening condition for children under five. Our therapeutic feeding centers provide specialized, high-energy ready-to-use therapeutic food (RUTF) to help children regain weight and recover. We also screen for and treat associated medical complications. Beyond immediate treatment, we empower mothers and caregivers with knowledge about nutrition and healthy feeding practices to prevent relapse and protect future generations.',
        },
        zh: {
            title: '对抗儿童营养不良',
            description: '建立治疗性喂养中心，治疗严重营养不良的儿童并提供营养教育。',
            longDescription: '严重急性营养不良对五岁以下儿童是危及生命的状况。我们的治疗性喂养中心提供专门的高能量即食治疗性食品（RUTF），帮助儿童恢复体重和健康。我们还筛查并治疗相关的医疗并发症。除了即时治疗，我们还向母亲和照顾者传授营养和健康喂养知识，以防止复发并保护未来几代人。',
        },
        'zh-TW': {
            title: '對抗兒童營養不良',
            description: '建立治療性餵養中心，治療嚴重營養不良的兒童並提供營養教育。',
            longDescription: '嚴重急性營養不良對五歲以下兒童是危及生命的狀況。我們的治療性餵養中心提供專門的高能量即食治療性食品（RUTF），幫助兒童恢復體重和健康。我們還篩查並治療相關的醫療併發症。除了即時治療，我們還向母親和照顧者傳授營養和健康餵養知識，以防止復發並保護未來幾代人。',
        },
        de: {
            title: 'Bekämpfung der Mangelernährung bei Kindern',
            description: 'Einrichtung von therapeutischen Ernährungszentren zur Behandlung schwer mangelernährter Kinder und zur Bereitstellung von Ernährungserziehung.',
            longDescription: 'Schwere akute Mangelernährung ist ein lebensbedrohlicher Zustand für Kinder unter fünf Jahren. Unsere therapeutischen Ernährungszentren bieten spezielle, energiereiche, gebrauchsfertige therapeutische Nahrung (RUTF), um Kindern zu helfen, wieder an Gewicht zuzunehmen und sich zu erholen. Wir untersuchen und behandeln auch damit verbundene medizinische Komplikationen. Über die sofortige Behandlung hinaus befähigen wir Mütter und Betreuer mit Wissen über Ernährung und gesunde Fütterungspraktiken, um Rückfälle zu verhindern und zukünftige Generationen zu schützen.',
        },
        ar: {
            title: 'مكافحة سوء تغذية الأطفال',
            description: 'إنشاء مراكز تغذية علاجية لعلاج الأطفال الذين يعانون من سوء التغذية الحاد وتوفير التثقيف الغذائي.',
            longDescription: 'سوء التغذية الحاد الوخيم حالة تهدد حياة الأطفال دون سن الخامسة. توفر مراكز التغذية العلاجية لدينا أغذية علاجية جاهزة للاستخدام (RUTF) متخصصة وعالية الطاقة لمساعدة الأطفال على استعادة الوزن والتعافي. كما نقوم بفحص وعلاج المضاعفات الطبية المرتبطة بها. بالإضافة إلى العلاج الفوري، نقوم بتمكين الأمهات ومقدمي الرعاية بالمعرفة حول التغذية وممارسات التغذية الصحية لمنع الانتكاس وحماية الأجيال القادمة.',
        },
        fr: {
            title: 'Lutte contre la malnutrition infantile',
            description: "Mise en place de centres d'alimentation thérapeutique pour traiter les enfants gravement malnutris et fournir une éducation nutritionnelle.",
            longDescription: "La malnutrition aiguë sévère est une condition potentiellement mortelle pour les enfants de moins de cinq ans. Nos centres d'alimentation thérapeutique fournissent des aliments thérapeutiques prêts à l'emploi (RUTF) spécialisés et à haute énergie pour aider les enfants à reprendre du poids et à se rétablir. Nous dépistons et traitons également les complications médicales associées. Au-delà du traitement immédiat, nous donnons aux mères et aux soignants les connaissances nécessaires sur la nutrition et les pratiques alimentaires saines pour prévenir les rechutes et protéger les générations futures.",
        },
        es: {
            title: 'Lucha contra la desnutrición infantil',
            description: 'Establecimiento de centros de alimentación terapéutica para tratar a niños con desnutrición grave y proporcionar educación nutricional.',
            longDescription: 'La desnutrición aguda grave es una afección que pone en peligro la vida de los niños menores de cinco años. Nuestros centros de alimentación terapéutica proporcionan alimentos terapéuticos listos para usar (RUTF) especializados y de alta energía para ayudar a los niños a recuperar peso y recuperarse. También detectamos y tratamos las complicaciones médicas asociadas. Más allá del tratamiento inmediato, capacitamos a las madres y cuidadores con conocimientos sobre nutrición y prácticas de alimentación saludables para prevenir recaídas y proteger a las generaciones futuras.',
        },
        ru: {
            title: 'Борьба с детским недоеданием',
            description: 'Создание терапевтических центров питания для лечения детей с тяжелым недоеданием и предоставления диетического образования.',
            longDescription: 'Тяжелое острое недоедание — это состояние, угрожающее жизни детей в возрасте до пяти лет. Наши терапевтические центры питания предоставляют специализированное, высокоэнергетическое готовое к употреблению терапевтическое питание (RUTF), чтобы помочь детям набрать вес и восстановиться. Мы также проводим скрининг и лечение сопутствующих медицинских осложнений. Помимо немедленного лечения, мы даем матерям и опекунам знания о питании и здоровых практиках кормления, чтобы предотвратить рецидивы и защитить будущие поколения.',
        },
        pt: {
            title: 'Combate à Desnutrição Infantil',
            description: 'Criação de centros de alimentação terapêutica para tratar crianças gravemente desnutridas e fornecer educação nutricional.',
            longDescription: 'A desnutrição aguda grave é uma condição que ameaça a vida de crianças menores de cinco anos. Os nossos centros de alimentação terapêutica fornecem alimentos terapêuticos prontos a usar (RUTF) especializados e de alta energia para ajudar as crianças a recuperar peso e a recuperar. Também rastreamos e tratamos complicações médicas associadas. Para além do tratamento imediato, capacitamos as mães e os cuidadores com conhecimentos sobre nutrição e práticas alimentares saudáveis para prevenir recaídas e proteger as gerações futuras.',
        },
        it: {
            title: 'Lotta alla malnutrizione infantile',
            description: "Creazione di centri di alimentazione terapeutica per trattare i bambini gravemente malnutriti e fornire educazione nutrizionale.",
            longDescription: "La malnutrizione acuta grave è una condizione potenzialmente letale per i bambini sotto i cinque anni. I nostri centri di alimentazione terapeutica forniscono alimenti terapeutici pronti all'uso (RUTF) specializzati e ad alta energia per aiutare i bambini a recuperare peso e a riprendersi. Effettuiamo anche lo screening e il trattamento delle complicanze mediche associate. Oltre al trattamento immediato, forniamo a madri e caregiver le conoscenze sulla nutrizione e sulle pratiche alimentari sane per prevenire le ricadute e proteggere le generazioni future.",
        }
    },
    goal: 300000,
    raised: 120000,
    imageUrl: 'https://picsum.photos/seed/child-malnutrition-clinic/600/400',
    location: 'The Sahel Region',
    needs: [
        { id: 'n4-1', category: 'Medical', priority: 'High', quantityNeeded: 10000, quantityFulfilled: 3000, translations: { 
            en: { name: 'Ready-to-Use Therapeutic Food (RUTF) Sachets' }, 
            zh: { name: '即食治疗性食品（RUTF）小袋' },
            'zh-TW': { name: '即食治療性食品（RUTF）小袋' },
            de: { name: 'Gebrauchsfertige therapeutische Nahrung (RUTF) Beutel' },
            ar: { name: 'أكياس الأغذية العلاجية الجاهزة للاستخدام (RUTF)' }
        } },
        { id: 'n4-2', category: 'Personnel', priority: 'Medium', quantityNeeded: 20, quantityFulfilled: 12, translations: { 
            en: { name: 'Nutritionists' }, 
            zh: { name: '营养师' },
            'zh-TW': { name: '營養師' },
            de: { name: 'Ernährungsberater' },
            ar: { name: 'أخصائيو التغذية' }
        } },
    ]
  },
];

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setProjects(MOCK_PROJECTS);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Simulate live donations updating project status
  useEffect(() => {
    if (loading || projects.length === 0) return;

    const interval = setInterval(() => {
      setProjects(currentProjects => {
        if (currentProjects.length === 0) {
          return currentProjects;
        }

        // Pick a random project to update for a more realistic effect
        const projectIndexToUpdate = Math.floor(Math.random() * currentProjects.length);
        
        return currentProjects.map((project, index) => {
          if (index === projectIndexToUpdate) {
            // Add a small random amount, ensuring it doesn't exceed the goal
            const amountToAdd = Math.floor(Math.random() * 50) + 1;
            const newRaised = Math.min(project.goal, project.raised + amountToAdd);
            
            if (newRaised > project.raised) {
              return { ...project, raised: newRaised };
            }
          }
          return project;
        });
      });
    }, 4000); // Update every 4 seconds

    return () => clearInterval(interval);
  }, [loading, projects.length]);

  return { projects, loading };
};