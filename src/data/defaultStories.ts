import { Story } from '../types';

export const defaultStories: Story[] = [
  {
    id: 'food-cooking-senses',
    title: 'Food, Cooking & Senses',
    description: 'Ẩm thực & Giác quan - Lên kế hoạch chuẩn bị bữa ăn và đánh thức mọi giác quan.',
    category: 'Daily Life',
    vietnameseStory: `Tại một buổi [gathering](sự tụ họp), người chef (đầu bếp) đang lên kế hoạch [prepare](chuẩn bị) một [variety](sự đa dạng) các món ăn cho khách mời. Anh mở cuốn [recipe](công thức nấu ăn) để nghiên cứu từng [type](loại) món ăn xem chúng sẽ [affect](ảnh hưởng) đến khẩu vị người dùng thế nào. Anh quyết định ra vườn để [pick](hái) một vài loại [herb](thảo mộc) vẫn còn rất [fresh](tươi).
Từng chiếc lá này là một [ingredient](nguyên liệu) quan trọng sẽ mang lại [flavor](hương vị) đặc trưng cho món cá [fried](chiên). Khi món [dish](món ăn) hoàn thành, nó không chỉ có [taste](vị, vị giác) mượt mà đánh thức mọi giác quan, mà còn cực kỳ [nutritious](giàu dinh dưỡng) cho sức khỏe.`,
    englishStory: `At a gathering, the chef is planning to prepare a variety of dishes for the guests. He opens the recipe book to study each type of dish to see how they will affect the guests' appetite. He decides to go to the garden to pick some herbs that are still very fresh.
Each of these leaves is an important ingredient that will bring a distinctive flavor to the fried fish. When the dish is completed, it not only has a smooth taste that awakens all senses, but is also extremely nutritious for health.`,
    vocabulary: [
      {
        word: 'gathering',
        phonetic: '/ˈɡæð.ər.ɪŋ/',
        vietnamese: 'sự tụ họp, buổi tập trung',
        definition: 'A meeting or assembly of people, especially for a social or festive purpose.',
        example: 'The family gathering was filled with laughter and stories.'
      },
      {
        word: 'prepare',
        phonetic: '/prɪˈpeər/',
        vietnamese: 'chuẩn bị',
        definition: 'To make something ready for use, consideration, or cooking.',
        example: 'The chef spent hours preparing the fresh ingredients for the dinner.'
      },
      {
        word: 'variety',
        phonetic: '/vəˈraɪ.ə.ti/',
        vietnamese: 'sự đa dạng, nhiều thứ khác nhau',
        definition: 'A number of different types of things, or a diverse assortment.',
        example: 'The buffet offered a wide variety of desserts to choose from.'
      },
      {
        word: 'recipe',
        phonetic: '/ˈres.ɪ.pi/',
        vietnamese: 'công thức nấu ăn',
        definition: 'A set of instructions for preparing a particular dish, including a list of the ingredients required.',
        example: 'She followed her grandmother\'s secret recipe to make the apple pie.'
      },
      {
        word: 'type',
        phonetic: '/taɪp/',
        vietnamese: 'loại, kiểu',
        definition: 'A category of people or things having common characteristics.',
        example: 'What type of fish is best suited for this recipe?'
      },
      {
        word: 'affect',
        phonetic: '/əˈfekt/',
        vietnamese: 'ảnh hưởng, tác động đến',
        definition: 'To have an effect on; to make a difference to or influence.',
        example: 'The choice of spices can greatly affect the final taste of the food.'
      },
      {
        word: 'pick',
        phonetic: '/pɪk/',
        vietnamese: 'hái, hái lượm, chọn',
        definition: 'To harvest or gather flowers, fruit, or leaves by breaking them off.',
        example: 'They went to the orchard to pick fresh apples.'
      },
      {
        word: 'herb',
        phonetic: '/hɜːb/',
        vietnamese: 'thảo mộc, rau thơm',
        definition: 'A plant whose leaves, seeds, or flowers are used for flavoring food, medicine, or perfume.',
        example: 'Adding a bit of fresh herb like rosemary makes the chicken taste wonderful.'
      },
      {
        word: 'fresh',
        phonetic: '/freʃ/',
        vietnamese: 'tươi, tươi mới',
        definition: 'Recently made, grown, or harvested; not stale, sour, or preserved.',
        example: 'I love using fresh vegetables instead of canned ones for cooking.'
      },
      {
        word: 'ingredient',
        phonetic: '/ɪnˈɡriː.di.ənt/',
        vietnamese: 'nguyên liệu, thành phần',
        definition: 'Any of the foods or substances that are combined to make a particular dish.',
        example: 'Flour, water, and yeast are the main ingredients of bread.'
      },
      {
        word: 'flavor',
        phonetic: '/ˈfleɪ.vər/',
        vietnamese: 'hương vị',
        definition: 'The distinctive taste of a food or drink, often enhanced by herbs and spices.',
        example: 'The mint leaves give this refreshing summer drink an incredible flavor.'
      },
      {
        word: 'fried',
        phonetic: '/fraɪd/',
        vietnamese: 'chiên, rán',
        definition: 'Cooked in hot fat or oil.',
        example: 'Fried chicken is highly popular but should be eaten in moderation.'
      },
      {
        word: 'dish',
        phonetic: '/dɪʃ/',
        vietnamese: 'món ăn, đĩa thức ăn',
        definition: 'A particular variety or preparation of food served as part of a meal.',
        example: 'Phở is a very famous traditional Vietnamese dish.'
      },
      {
        word: 'taste',
        phonetic: '/teɪst/',
        vietnamese: 'vị, vị giác, thưởng thức',
        definition: 'The sensation of flavor perceived in the mouth and throat on contact with a substance.',
        example: 'The sauce has a slightly sweet and sour taste.'
      },
      {
        word: 'nutritious',
        phonetic: '/njuːˈtrɪʃ.əs/',
        vietnamese: 'giàu dinh dưỡng',
        definition: 'Efficient as food; nourishing and healthy for the body.',
        example: 'Oatmeal is a highly nutritious option for breakfast.'
      }
    ]
  },
  {
    id: 'tech-office-life',
    title: 'Technology & Office Collaboration',
    description: 'Công nghệ & Công sở - Buổi ra mắt dự án mới đầy thử thách của đội ngũ lập trình.',
    category: 'Workplace',
    vietnameseStory: `Tại một công ty công nghệ lớn, dự án mới đòi hỏi sự [collaboration](sự hợp tác) chặt chẽ giữa các phòng ban. Người trưởng nhóm muốn [implement](triển khai) một hệ thống làm việc linh hoạt để [optimize](tối ưu hóa) hiệu suất của toàn đội. Mỗi thành viên đều có một [responsibility](trách nhiệm) cụ thể nhằm [prevent](ngăn chặn) bất kỳ sai sót kỹ thuật nào có thể phát sinh.
Khi họ đối mặt với một lỗi hệ thống cực kỳ phức tạp, sự [creativity](sức sáng tạo) đã giúp cả nhóm nhanh chóng tìm ra một giải pháp mang tính [innovative](đột phá). Nhờ quy trình kiểm thử [efficient](hiệu quả), dự án đã ra mắt thành công và nhận được sự đánh giá cao từ khách hàng.`,
    englishStory: `At a major tech company, the new project requires close collaboration between departments. The team leader wants to implement a flexible working system to optimize the team's productivity. Each member has a specific responsibility to prevent any technical errors that might arise.
When they faced a highly complex system bug, creativity helped the team quickly find an innovative solution. Thanks to an efficient testing process, the project launched successfully and received high praise from clients.`,
    vocabulary: [
      {
        word: 'collaboration',
        phonetic: '/kəˌlæb.əˈreɪ.ʃən/',
        vietnamese: 'sự hợp tác',
        definition: 'The action of working with someone to produce or create something.',
        example: 'The success of the project was due to the excellent collaboration between design and development.'
      },
      {
        word: 'implement',
        phonetic: '/ˈɪm.plɪ.ment/',
        vietnamese: 'triển khai, thi hành',
        definition: 'To put a decision, plan, or agreement into effect.',
        example: 'Our team will implement the new software security protocols tomorrow.'
      },
      {
        word: 'optimize',
        phonetic: '/ˈɒp.tɪ.maɪz/',
        vietnamese: 'tối ưu hóa',
        definition: 'To make the best or most effective use of a situation or resource.',
        example: 'We adjusted our code to optimize the loading speed of the webpage.'
      },
      {
        word: 'responsibility',
        phonetic: '/rɪˌspɒn.sɪˈbɪl.ə.ti/',
        vietnamese: 'trách nhiệm',
        definition: 'The state or fact of having a duty to deal with something or of having control over someone.',
        example: 'Designing the user interface is my primary responsibility on this team.'
      },
      {
        word: 'prevent',
        phonetic: '/prɪˈvent/',
        vietnamese: 'ngăn chặn, ngăn ngừa',
        definition: 'To keep something from happening or arising.',
        example: 'Writing unit tests is a great way to prevent future bugs in your application.'
      },
      {
        word: 'creativity',
        phonetic: '/ˌkriː.eɪˈtɪv.ə.ti/',
        vietnamese: 'sức sáng tạo',
        definition: 'The use of the imagination or original ideas, especially in the production of an artistic work.',
        example: 'Solving coding challenges often requires a high degree of creativity.'
      },
      {
        word: 'innovative',
        phonetic: '/ˈɪn.ə.və.tɪv/',
        vietnamese: 'mang tính đột phá, đổi mới',
        definition: 'Featuring new methods; advanced and original.',
        example: 'They won the hackathon with a highly innovative mobile application.'
      },
      {
        word: 'efficient',
        phonetic: '/ɪˈfɪʃ.ənt/',
        vietnamese: 'hiệu quả, năng suất cao',
        definition: 'Achieving maximum productivity with minimum wasted effort or expense.',
        example: 'An efficient algorithm runs faster and consumes less server memory.'
      }
    ]
  },
  {
    id: 'travel-exploration',
    title: 'Adventure & Travel Exploration',
    description: 'Du lịch & Khám phá - Hành trình chinh phục vùng đất mới kỳ vĩ.',
    category: 'Travel',
    vietnameseStory: `Để bắt đầu một hành trình [adventure](cuộc phiêu lưu), nhóm bạn trẻ đã dành nhiều tuần để lên kế hoạch tỉ mỉ. Họ muốn [explore](khám phá) một vùng thung lũng hẻo lánh nổi tiếng với cảnh sắc thiên nhiên [breathtaking](đẹp đến nín thở). Để chuyến đi diễn ra an toàn, họ thuê một hướng dẫn viên địa phương rất [knowledgeable](am hiểu, tường tận) về địa hình rừng núi.
Vượt qua những chặng đường dốc gồ ghề, cả đoàn vô cùng hào hứng khi được [experience](trải nghiệm) cuộc sống cắm trại hoang dã. Khoảnh khắc ngắm hoàng hôn buông xuống đỉnh núi kỳ vĩ là một kỷ niệm vô giá, giúp họ cảm nhận sâu sắc vẻ đẹp của sự tự do và tình bạn.`,
    englishStory: `To begin an adventure, the group of friends spent weeks planning meticulously. They wanted to explore a remote valley famous for its breathtaking natural scenery. To ensure a safe trip, they hired a local guide who is highly knowledgeable about the mountain terrain.
Overcoming rugged, steep trails, the whole team was extremely excited to experience wild camping life. The moment of watching the sunset over the majestic mountain peak was an invaluable memory, letting them deeply feel the beauty of freedom and friendship.`,
    vocabulary: [
      {
        word: 'adventure',
        phonetic: '/ədˈven.tʃər/',
        vietnamese: 'cuộc phiêu lưu, chuyến phiêu lưu',
        definition: 'An unusual and exciting, typically hazardous, experience or activity.',
        example: 'Hiking through the deep jungle was a thrilling adventure.'
      },
      {
        word: 'explore',
        phonetic: '/ɪkˈsplɔːr/',
        vietnamese: 'khám phá',
        definition: 'To travel through an unfamiliar area in order to learn about or familiarize oneself with it.',
        example: 'We decided to rent bicycles and explore the ancient town.'
      },
      {
        word: 'breathtaking',
        phonetic: '/ˈbreθˌteɪ.kɪŋ/',
        vietnamese: 'đẹp đến nín thở, ngoạn mục',
        definition: 'Astonishing or awe-inspiring in quality, beauty, or grandeur.',
        example: 'The view of the sun rising over the ocean was absolutely breathtaking.'
      },
      {
        word: 'knowledgeable',
        phonetic: '/ˈnɒl.ɪ.dʒə.bəl/',
        vietnamese: 'am hiểu, tường tận, có kiến thức rộng',
        definition: 'Intelligent and well informed about a particular subject or in general.',
        example: 'The museum guide was very knowledgeable about local history.'
      },
      {
        word: 'experience',
        phonetic: '/\u026ak\u02c8sp\u026a\u0259.ri.\u0259ns/',
        vietnamese: 'tr\u1ea3i nghi\u1ec7m, kinh nghi\u1ec7m',
        definition: 'To undergo or encounter an event, or the knowledge gained through doing something.',
        example: 'Studying abroad is a great way to experience new cultures.'
      }
    ]
  },
  {
    id: 'nature-environment-space',
    title: 'Nature, Environment & Space',
    description: 'T\u1ef1 nhi\u00ean & M\u00f4i tr\u01b0\u1eddng - Kh\u00e1m ph\u00e1 v\u1ebb \u0111\u1eb9p v\u00e0 nh\u1eefng m\u1ed1i \u0111e d\u1ecda \u0111\u1ed1i v\u1edbi h\u00e0nh tinh xanh.',
    category: 'Nature',
    vietnameseStory: `Trong th\u1ebf gi\u1edbi [nature](t\u1ef1 nhi\u00ean), Tr\u00e1i \u0110\u1ea5t ch\u1ec9 l\u00e0 m\u1ed9t [planet](h\u00e0nh tinh) thu\u1ed9c m\u1ed9t [star system](h\u1ec7 sao) nh\u1ecf b\u00e9 trong [galaxy](thi\u00ean h\u00e0) bao la. Tuy nhi\u00ean, [environment](m\u00f4i tr\u01b0\u1eddng) [natural](thu\u1ed9c t\u1ef1 nhi\u00ean) tr\u00ean h\u00e0nh tinh n\u00e0y \u0111ang b\u1ecb \u0111e d\u1ecda nghi\u00eam tr\u1ecdng. [Climate change](bi\u1ebfn \u0111\u1ed5i kh\u00ed h\u1eadu) v\u00e0 vi\u1ec7c con ng\u01b0\u1eddi l\u00e0m [pollute](\u00f4 nhi\u1ec5m) ngu\u1ed3n n\u01b0\u1edbc \u0111ang tr\u1edf th\u00e0nh nh\u1eefng [environmental threat](m\u1ed1i \u0111e d\u1ecda m\u00f4i tr\u01b0\u1eddng) h\u00e0ng \u0111\u1ea7u. T\u1eeb l\u00fac [sunrise](b\u00ecnh minh) \u0111\u1ebfn [sundown](ho\u00e0ng h\u00f4n), [temperature](nhi\u1ec7t \u0111\u1ed9) t\u0103ng cao khi\u1ebfn c\u00e1c v\u1ee5 ch\u00e1y r\u1eebng d\u1ec5 x\u1ea3 ra, t\u1ea1o n\u00ean nh\u1eefng chi\u1ebfc b\u00f3ng [shadow](chi\u1ebfc b\u00f3ng) kh\u00f3i kh\u1ed5ng l\u1ed3 bao ph\u1ee7 v\u00f9ng \u0111\u1ea5t [nearest](g\u1ea7n nh\u1ea5t).

L\u1ef1c l\u01b0\u1ee3ng ki\u1ec3m l\u00e2m \u0111ang n\u1ed7 l\u1ef1c [protect](b\u1ea3o v\u1ec7) [green space](kh\u00f4ng gian xanh) \u0111\u1ec3 c\u00e1c lo\u00e0i [wildlife](\u0111\u1ed9ng v\u1eadt hoang d\u00e3) \u0111\u01b0\u1ee3c s\u1ed1ng [safe](an to\u00e0n). M\u1ed9t ch\u00fa chim nh\u1ecf \u0111ang c\u1ed1 bay t\u00ecm m\u1ed9t [branch](c\u00e0nh c\u00e2y) kh\u00f4 trong [forest](khu r\u1eebng) \u0111\u1ec3 [lay eggs](\u0111\u1ebb tr\u1ee9ng), nh\u01b0ng vi\u1ec7c ch\u1eb7t ph\u00e1 l\u1ea5y [wood](g\u1ed7) \u0111\u00e3 bi\u1ebfn n\u01a1i n\u00e0y th\u00e0nh [desert](sa m\u1ea1c) kh\u00f4 c\u1eb1n. Nh\u1eefng lo\u00e0i [creature](sinh v\u1eadt) l\u1edbn nh\u01b0 voi r\u1eebng hay c\u00e1 voi [whale](c\u00e1 voi) ngo\u00e0i \u0111\u1ea1i d\u01b0\u01a1ng \u0111\u1ec1u \u0111ang r\u01b1i v\u00e0o danh s\u00e1ch [endangered](b\u1ecb \u0111e d\u1ecda tuy\u1ec7t ch\u1ee7ng). N\u1ebfu th\u1ea3m h\u1ea1i thi\u00ean tai nh\u01b0 [flood](l\u0169 l\u1ee5t) ho\u1eb7c s\u1ef1 phun tr\u00e0o c\u1ee7a n\u00fai l\u1eeda [volcano](n\u00fai l\u1eeda) ti\u1ebfp t\u1ee5c di\u1ec5n ra, ch\u00fang c\u00f3 th\u1ec3 bi\u1ebfn m\u1ea5t [disappear](bi\u1ebfn m\u1ea5t) v\u00e0 v\u0129nh vi\u1ec5n b\u1ecb [extinct](tuy\u1ec7t ch\u1ee7ng), ch\u1ec9 \u0111\u1ec3 l\u1ea1i nh\u1eefng b\u1ed9 x\u01b0\u01a1ng [skeleton](b\u1ed9 x\u01b0\u01a1ng) v\u00e0 \u0111\u1ea7u l\u00e2u [skull](\u0111\u1ea7u l\u00e2u) h\u00f3a th\u1ea1ch. Vi\u1ec7c b\u1ea3o v\u1ec7 t\u1ef1 nhi\u00ean ch\u00ednh l\u00e0 b\u1ea3o v\u1ec7 [treasure](kho b\u00e1u) l\u1edbn nh\u1ea5t c\u1ee7a nh\u00e2n lo\u1ea1i.`,
    englishStory: `In the world of nature, Earth is only a planet belonging to a small star system in the vast galaxy. However, the natural environment on this planet is being seriously threatened. Climate change and humans polluting water sources are becoming top environmental threats. From sunrise to sundown, the temperature rises high, making forest fires easily occur, creating huge smoke shadows covering the nearest land.

Rangers are working hard to protect green space so that wildlife can live safe. A small bird is trying to fly to find a dry branch in the forest to lay eggs, but cutting wood has turned this place into a barren desert. Large creatures such as forest elephants or whales in the ocean are falling into the endangered list. If natural disasters like flood or volcano eruptions continue to happen, they could disappear and become extinct forever, leaving only fossil skeletons and skulls. Protecting nature is indeed protecting the greatest treasure of mankind.`,
    vocabulary: [
      {
        word: 'nature',
        phonetic: '/\u02c8ne\u026a.t\u0283\u0259r/',
        vietnamese: 't\u1ef1 nhi\u00ean',
        definition: 'The physical world and everything in it (such as plants, animals, mountains, oceans, stars, etc.) that is not made by people.',
        example: 'It is important to preserve nature for future generations.'
      },
      {
        word: 'planet',
        phonetic: '/\u02c8pl\u00e6n.\u026at/',
        vietnamese: 'h\u00e0nh tinh',
        definition: 'A large, round object in space that travels around a star.',
        example: 'Earth is the third planet from the Sun.'
      },
      {
        word: 'star system',
        phonetic: '/st\u0251\u02d0r \u02c8s\u026as.t\u0259m/',
        vietnamese: 'h\u1ec7 sao',
        definition: 'A group of stars and celestial bodies that orbit each other or a common center of gravity.',
        example: 'The Solar System is our local star system centered around the Sun.'
      },
      {
        word: 'galaxy',
        phonetic: '/\u02c8\u0261\u00e6l.\u0259k.si/',
        vietnamese: 'thi\u00ean h\u00e0',
        definition: 'Any of the very large groups of stars and associated matter that are found throughout the universe.',
        example: 'The Milky Way is the galaxy that contains our Solar System.'
      },
      {
        word: 'environment',
        phonetic: '/\u026an\u02c8va\u026a.r\u0259n.m\u0259nt/',
        vietnamese: 'm\u00f4i tr\u01b0\u1eddng',
        definition: 'The surroundings or conditions in which a person, animal, or plant lives or operates.',
        example: 'We should do more to protect our precious environment.'
      },
      {
        word: 'natural',
        phonetic: '/\u02c8n\u00e6t\u0283.\u0259r.\u0259l/',
        vietnamese: 'thu\u1ed9c t\u1ef1 nhi\u00ean',
        definition: 'Existing in or caused by nature; not made or caused by humankind.',
        example: 'She prefers natural ingredients over synthetic chemicals.'
      },
      {
        word: 'climate change',
        phonetic: '/\u02c8kla\u026a.m\u0259t t\u0283e\u026and\u0292/',
        vietnamese: 'bi\u1ebfn \u0111\u1ed5i kh\u00ed h\u1eadu',
        definition: 'A long-term change in the Earth\'s climate, especially a change due to an increase in the average atmospheric temperature.',
        example: 'Climate change poses a serious risk to coastal cities around the world.'
      },
      {
        word: 'pollute',
        phonetic: '/p\u0259\u02c8lu\u02d0t/',
        vietnamese: '\u00f4 nhi\u1ec5m',
        definition: 'To contaminate water, air, or soil with harmful or poisonous substances.',
        example: 'Factories should not be allowed to pollute nearby rivers.'
      },
      {
        word: 'environmental threat',
        phonetic: '/\u026an\u02ccva\u026a.r\u0259n\u02c8men.t\u0259l \u03b8ret/',
        vietnamese: 'm\u1ed1i \u0111e d\u1ecda m\u00f4i tr\u01b0\u1eddng',
        definition: 'Any threat or hazard to the ecosystem or environment.',
        example: 'Plastic pollution is a growing environmental threat to marine wildlife.'
      },
      {
        word: 'sunrise',
        phonetic: '/\u02c8s\u028cn.ra\u026az/',
        vietnamese: 'b\u00ecnh minh',
        definition: 'The time in the morning when the sun appears.',
        example: 'They woke up early to watch the beautiful sunrise over the sea.'
      },
      {
        word: 'sundown',
        phonetic: '/\u02c8s\u028cn.da\u028an/',
        vietnamese: 'ho\u00e0ng h\u00f4n',
        definition: 'The time in the evening when the sun goes down; sunset.',
        example: 'The farmers worked in the fields from sunrise to sundown.'
      },
      {
        word: 'temperature',
        phonetic: '/\u02c8tem.pr\u0259.t\u0283\u0259r/',
        vietnamese: 'nhi\u1ec5t \u0111\u1ed9',
        definition: 'A measure of how hot or cold something is.',
        example: 'The water temperature is perfect for swimming today.'
      },
      {
        word: 'shadow',
        phonetic: '/\u02c8\u0283\u00e6d.\u0259\u028a/',
        vietnamese: 'chi\u1ebfc b\u00f3ng, b\u00f3ng r\u00e2m',
        definition: 'A dark area or shape produced by a body coming between rays of light and a surface.',
        example: 'The giant trees cast a cool, dark shadow over the pathway.'
      },
      {
        word: 'nearest',
        phonetic: '/\u02c8n\u026a\u0259.r\u026ast/',
        vietnamese: 'g\u1ea7n nh\u1ea5t',
        definition: 'Located closest to a particular place or position.',
        example: 'Where is the nearest hospital around here?'
      },
      {
        word: 'protect',
        phonetic: '/pr\u0259\u02c8tekt/',
        vietnamese: 'b\u1ea3o v\u1ec7',
        definition: 'To keep safe from harm, injury, or damage.',
        example: 'Rangers work tirelessly to protect the forest from illegal loggers.'
      },
      {
        word: 'green space',
        phonetic: '/\u0261ri\u02d0n spe\u026as/',
        vietnamese: 'kh\u00f4ng gian xanh',
        definition: 'An area of grass, trees, or other vegetation set apart for recreational or aesthetic purposes in an otherwise urban environment.',
        example: 'Urban planners are adding more green spaces in the city center.'
      },
      {
        word: 'wildlife',
        phonetic: '/\u02c8wa\u026ald.la\u026af/',
        vietnamese:'\u0111\u1ed9ng v\u1eadt hoang d\u00e3',
        definition: 'Wild animals collectively; the native fauna (and sometimes flora) of a region.',
        example: 'The national park is home to a rich variety of wildlife.'
      },
      {
        word: 'safe',
        phonetic: '/se\u026af/',
        vietnamese: 'an to\u00e0n',
        definition: 'Protected from or not exposed to danger or risk; not likely to be harmed or lost.',
        example: 'Please make sure the campfire is completely out so the forest is safe.'
      },
      {
        word: 'branch',
        phonetic: '/br\u0251\u02d0nt\u0283/',
        vietnamese: 'c\u00e0nh c\u00e2y',
        definition: 'A part of a tree which grows out from the trunk or from a bough.',
        example: 'A squirrel sat quietly on a thick branch of the oak tree.'
      },
      {
        word: 'forest',
        phonetic: '/\u02c8f\u0252r.\u026ast/',
        vietnamese: 'khu r\u1eebng',
        definition: 'A large area covered chiefly with trees and undergrowth.',
        example: 'We took a refreshing walk through the pine forest.'
      },
      {
        word: 'lay eggs',
        phonetic: '/le\u026a e\u0261z/',
        vietnamese: '\u0111\u1ebb tr\u1ee9ng',
        definition: 'To produce eggs from inside the body of birds, reptiles, or insects.',
        example: 'Sea turtles travel thousands of miles to lay eggs on the beach.'
      },
      {
        word: 'wood',
        phonetic: '/w\u028ad/',
        vietnamese: 'g\u1ed7',
        definition: 'The hard fibrous material that forms the main substance of the trunk or branches of a tree.',
        example: 'The table is made of solid cherry wood.'
      },
      {
        word: 'desert',
        phonetic: '/\u02c8dez.\u0259t/',
        vietnamese: 'sa m\u1ea1c',
        definition: 'Barren area of landscape where little precipitation occurs and, consequently, living conditions are hostile for plant and animal life.',
        example: 'Camels are well-adapted to the hot, dry desert.'
      },
      {
        word: 'creature',
        phonetic: '/\u02c8kri\u02d0.t\u0283\u0259r/',
        vietnamese: 'sinh v\u1eadt',
        definition: 'An animal, as distinct from a human being, or any living being.',
        example: 'The deep ocean contains many strange and beautiful creatures.'
      },
      {
        word: 'whale',
        phonetic: '/we\u026al/',
        vietnamese: 'c\u00e1 voi',
        definition: 'A very large marine mammal with a blowhole on top of the head for breathing.',
        example: 'We saw a blue whale breaching during our boat tour.'
      },
      {
        word: 'endangered',
        phonetic: '/\u026an\u02c8de\u026an.d\u0292\u0259d/',
        vietnamese: 'b\u1ecb \u0111e d\u1ecda tuy\u1ec7t ch\u1ee7ng',
        definition: '(Of a species) seriously at risk of extinction.',
        example: 'Pandas are still classified as an endangered species.'
      },
      {
        word: 'flood',
        phonetic: '/fl\u028cd/',
        vietnamese: 'l\u0169 l\u1ee5t',
        definition: 'An overflowing of a large amount of water beyond its normal confines, especially over what is normally dry land.',
        example: 'Heavy rains caused a severe flood in the low-lying town.'
      },
      {
        word: 'volcano',
        phonetic: '/v\u0252l\u02c8ke\u026a.n\u0259\u028a/',
        vietnamese: 'n\u00fai l\u1eeda',
        definition: 'A mountain or hill, typically conical, having a crater or vent through which lava, rock fragments, hot vapor, and gas are being or have been erupted.',
        example: 'The active volcano began to erupt, casting smoke into the sky.'
      },
      {
        word: 'disappear',
        phonetic: '/\u02ccd\u026as.\u0259\u02c8p\u026a\u0259r/',
        vietnamese: 'bi\u1ebfn m\u1ea5t',
        definition: 'To cease to be visible or to exist.',
        example: 'The sun slowly disappeared behind the heavy clouds.'
      },
      {
        word: 'extinct',
        phonetic: '/\u026ak\u02c8st\u026a\u0259kt/',
        vietnamese: 'tuy\u1ec7t ch\u1ee7ng',
        definition: '(Of a species, family, or other larger group) having no living members.',
        example: 'Dinosaurs became extinct millions of years ago.'
      },
      {
        word: 'skeleton',
        phonetic: '/\u02c8skel.\u0259.t\u0259n/',
        vietnamese: 'b\u1ed9 x\u01b0\u01a1ng',
        definition: 'An internal or framework of bone, cartilage, or other rigid material supporting or containing the body of an animal or plant.',
        example: 'The museum displayed a complete skeleton of a Tyrannosaurus rex.'
      },
      {
        word: 'skull',
        phonetic: '/sk\u028cl/',
        vietnamese: '\u0111\u1ea7u l\u00e2u, x\u01b0\u01a1ng s\u1ecd',
        definition: 'The bony framework of the head of a vertebrate, enclosing and protecting the brain and chief sense organs.',
        example: 'The archaeologist carefully uncovered a fossilized human skull.'
      },
      {
        word: 'treasure',
        phonetic: '/\u02c8tre\u0292.\u0259r/',
        vietnamese: 'kho báu',
        definition: 'A quantity of precious metals, gems, or other valuable objects, or something highly prized.',
        example: 'Books are a treasure chest of knowledge and adventure.'
      }
    ]
  },
  {
    id: 'people-society-culture',
    title: 'People, Society & Culture',
    description: 'Con người, Xã hội & Văn hóa - Khám phá các mối quan hệ xã hội, quyền bình đẳng, tiêu chuẩn sống và di sản văn hóa lâu đời.',
    category: 'Society',
    vietnameseStory: `Trong một [community](cộng đồng) văn minh, mỗi [citizen](công dân) và [resident](cư dân) đều được hưởng các quyền lợi [equal](bình đẳng). Những người [leader](lãnh đạo) trong [government](chính phủ) và các vị [official](quan chức, người có thẩm quyền) luôn nỗ lực cải thiện [life expectancy](tuổi thọ trung bình) cho toàn bộ [population](dân số). Họ đặc biệt chú trọng việc giúp đỡ các [ethnic group](nhóm dân tộc) thiểu số vượt qua cảnh [poverty](nghèo đói). Từ thời [childhood](tuổi thơ) cho đến khi trở thành một [adult](người lớn) sống [independent](tự lập), con người luôn được định hướng giáo dục. Chính quyền đã xây dựng nhiều [primary school](trường tiểu học) để cung cấp [free education](giáo dục miễn phí).

Cả học sinh [male](nam) và [female](nữ) đều được rèn luyện [behavior](hành vi, cách ứng xử) văn minh và tìm hiểu sâu sắc về [culture](văn hóa) dân tộc. Dù bạn là một [soldier](người lính) đang bảo vệ đất nước, một người làm [career](sự nghiệp) lớn với nhiều [assistant](trợ lý), hay chỉ là một người chơi thể thao [amateur](nghiệp dư), xã hội đều tạo điều kiện cho bạn phát triển. Ngay cả một người [stranger](người lạ) khi ghé thăm các ngôi [church](nhà thờ) cổ kính từ thời [empire](đế chế) ngày xưa cũng phải trầm trồ trước [standard](tiêu chuẩn) sống cao tại đây và vui vẻ hòa mình vào dòng người trong lễ hội [parade](diễu hành) đường phố.`,
    englishStory: `In a civilized community, every citizen and resident enjoys equal rights. Leaders in the government and officials always strive to improve life expectancy for the entire population. They pay special attention to helping ethnic groups overcome poverty. From childhood until becoming an independent adult, people are always guided by education. The government has built many primary schools to provide free education.

Both male and female students are trained in civilized behavior and learn deeply about ethnic culture. Whether you are a soldier defending the country, a career person with many assistants, or just an amateur sports player, society creates conditions for you to grow. Even a stranger visiting historic churches from the old empire marvels at the high standard of living here and happily joins the street parade.`,
    vocabulary: [
      {
        word: 'community',
        phonetic: '/kəˈmjuː.nə.ti/',
        vietnamese: 'cộng đồng',
        definition: 'A group of people living in the same place or having a particular characteristic in common.',
        example: 'Our local community works together to keep the streets clean and safe.'
      },
      {
        word: 'citizen',
        phonetic: '/ˈsɪt.ɪ.zən/',
        vietnamese: 'công dân',
        definition: 'A legally recognized subject or national of a state or commonwealth, either native or naturalized.',
        example: 'Every citizen has the right to vote in the national election.'
      },
      {
        word: 'resident',
        phonetic: '/ˈrez.ɪ.dənt/',
        vietnamese: 'cư dân',
        definition: 'A person who lives somewhere permanently or on a long-term basis.',
        example: 'The residents of the apartment building met to discuss the new parking rules.'
      },
      {
        word: 'equal',
        phonetic: '/ˈiː.kwəl/',
        vietnamese: 'bình đẳng',
        definition: 'Being the same in quantity, size, degree, value, or status.',
        example: 'All human beings are born free and equal in dignity and rights.'
      },
      {
        word: 'leader',
        phonetic: '/ˈiː.dər/',
        vietnamese: 'lãnh đạo',
        definition: 'The person who leads or commands a group, organization, or country.',
        example: 'A great leader inspires others to achieve their full potential.'
      },
      {
        word: 'government',
        phonetic: '/ˈɡʌv.ən.mənt/',
        vietnamese: 'chính phủ',
        definition: 'The governing body of a nation, state, or community.',
        example: 'The government announced a new plan to invest in public education.'
      },
      {
        word: 'official',
        phonetic: '/əˈfɪʃ.əl/',
        vietnamese: 'quan chức, người có thẩm quyền',
        definition: 'A person holding public office or having official duties.',
        example: 'A senior government official confirmed that the treaty had been signed.'
      },
      {
        word: 'life expectancy',
        phonetic: '/ˈlaɪf ɪkˌspek.tən.si/',
        vietnamese: 'tuổi thọ trung bình',
        definition: 'The average period that a person may expect to live.',
        example: 'Better healthcare has significantly increased life expectancy worldwide.'
      },
      {
        word: 'population',
        phonetic: '/ˌpɒp.jəˈleɪ.ʃən/',
        vietnamese: 'dân số',
        definition: 'All the inhabitants of a particular town, area, or country.',
        example: 'The world population is projected to reach nine billion soon.'
      },
      {
        word: 'ethnic group',
        phonetic: '/ˈeθ.nɪk ɡruːp/',
        vietnamese: 'nhóm dân tộc',
        definition: 'A community or population made up of people who share a common cultural background or descent.',
        example: 'The country is home to a rich mosaic of different ethnic groups.'
      },
      {
        word: 'poverty',
        phonetic: '/ˈpɒv.ə.ti/',
        vietnamese: 'nghèo đói',
        definition: 'The state of being extremely poor or having extremely low income.',
        example: 'The charity works to eradicate poverty and hunger in developing areas.'
      },
      {
        word: 'childhood',
        phonetic: '/ˈtʃaɪld.hʊd/',
        vietnamese: 'tuổi thơ',
        definition: 'The state or period of being a child.',
        example: 'She spent her childhood playing outdoors with her siblings.'
      },
      {
        word: 'adult',
        phonetic: '/ˈæd.ʌlt/',
        vietnamese: 'người lớn',
        definition: 'A person who is fully grown or developed.',
        example: 'Adults must buy a full-price ticket, but children get in for free.'
      },
      {
        word: 'independent',
        phonetic: '/ˌɪn.dɪˈpen.dənt/',
        vietnamese: 'tự lập',
        definition: 'Free from outside control; not depending on another\'s authority or support.',
        example: 'Moving out of her parents\' house helped her become fully independent.'
      },
      {
        word: 'primary school',
        phonetic: '/ˈpraɪ.mə.ri skuːl/',
        vietnamese: 'trường tiểu học',
        definition: 'A school for children between the ages of about five and eleven.',
        example: 'My daughter is currently in her third year of primary school.'
      },
      {
        word: 'free education',
        phonetic: '/friː ˌed.jʊˈkeɪ.ʃən/',
        vietnamese: 'giáo dục miễn phí',
        definition: 'Education that is funded through taxation and provided with no tuition fees to students.',
        example: 'The constitution guarantees free education up to secondary school level.'
      },
      {
        word: 'male',
        phonetic: '/meɪl/',
        vietnamese: 'nam, giống đực',
        definition: 'Of or denoting the sex that produces gametes, especially spermatozoa.',
        example: 'The male bird has bright, colorful feathers to attract a mate.'
      },
      {
        word: 'female',
        phonetic: '/ˈfiː.meɪl/',
        vietnamese: 'nữ, giống cái',
        definition: 'Of or denoting the sex that can bear offspring or produce eggs.',
        example: 'The female lion is the primary hunter for her pride.'
      },
      {
        word: 'behavior',
        phonetic: '/bɪˈheɪ.vjər/',
        vietnamese: 'hành vi, cách ứng xử',
        definition: 'The way in which one acts or conducts oneself, especially toward others.',
        example: 'The teacher praised the students for their excellent behavior during the trip.'
      },
      {
        word: 'culture',
        phonetic: '/ˈkʌl.tʃər/',
        vietnamese: 'văn hóa',
        definition: 'The ideas, customs, and social behavior of a particular people or society.',
        example: 'We learned about the rich history and culture of the indigenous tribe.'
      },
      {
        word: 'soldier',
        phonetic: '/ˈsəʊl.dʒər/',
        vietnamese: 'người lính',
        definition: 'A person who serves in an army.',
        example: 'The brave soldier was honored with a medal for his outstanding service.'
      },
      {
        word: 'career',
        phonetic: '/kəˈrɪər/',
        vietnamese: 'sự nghiệp',
        definition: 'An occupation undertaken for a significant period of a person\'s life and with opportunities for progress.',
        example: 'He chose to pursue a rewarding career in environmental science.'
      },
      {
        word: 'assistant',
        phonetic: '/əˈsɪs.tənt/',
        vietnamese: 'trợ lý',
        definition: 'A person who ranks below another in office or class and gives help in a supporting capacity.',
        example: 'The director delegated the administrative tasks to her assistant.'
      },
      {
        word: 'amateur',
        phonetic: '/ˈæm.ə.tər/',
        vietnamese: 'nghiệp dư',
        definition: 'Engaging or engaged in an activity as a pastime rather than professionally.',
        example: 'He is an amateur photographer who takes beautiful pictures of landscapes.'
      },
      {
        word: 'stranger',
        phonetic: '/ˈstreɪn.dʒər/',
        vietnamese: 'người lạ',
        definition: 'A person whom one does not know or with whom one is not familiar.',
        example: 'Don\'t accept rides or gifts from a stranger.'
      },
      {
        word: 'church',
        phonetic: '/tʃɜːtʃ/',
        vietnamese: 'nhà thờ',
        definition: 'A building used for public Christian worship.',
        example: 'They visited a historic church built in the thirteenth century.'
      },
      {
        word: 'empire',
        phonetic: '/ˈem.paɪər/',
        vietnamese: 'đế chế',
        definition: 'An extensive group of states or countries under a single supreme authority, formerly especially an emperor or empress.',
        example: 'The Roman Empire covered vast territories across Europe and the Mediterranean.'
      },
      {
        word: 'standard',
        phonetic: '/ˈstæn.dəd/',
        vietnamese: 'tiêu chuẩn',
        definition: 'A level of quality or attainment, or an idea or thing used as a measure, norm, or model.',
        example: 'This restaurant maintains a high standard of cleanliness and service.'
      },
      {
        word: 'parade',
        phonetic: '/pəˈreɪd/',
        vietnamese: 'diễu hành',
        definition: 'A public procession, especially one celebrating a special day or event and including marching bands and floats.',
        example: 'A festive parade moved slowly down the main street on Independence Day.'
      }
    ]
  },
  {
    id: 'business-media-tech',
    title: 'Business, Media & Tech',
    description: 'Kinh doanh, Truyền thông & Công nghệ - Khám phá thế giới của các doanh nghiệp số, truyền thông lan truyền, nghiên cứu khoa học và phát triển sản phẩm.',
    category: 'Business',
    vietnameseStory: `Một [business](doanh nghiệp) đã thành lập một [company](công ty) để phát triển một [product](sản phẩm) đặc biệt, kết hợp cả [goods](hàng hóa) và [service](dịch vụ) số. Để thuyết phục [customer](khách hàng), một [advertiser](nhà quảng cáo) đã thiết kế [package](bao bì) bắt mắt và viết phần [description](miêu tả) cực kỳ chi tiết để [persuade](thuyết phục) người mua. Họ đưa ra một [offer](đề nghị) dùng thử trên [social media](mạng xã hội). Một [influencer](người có ảnh hưởng) đã dùng [account](tài khoản) cá nhân trên [platform](nền tảng) này để đăng bài [post](bài đăng) chia sẻ trải nghiệm. Nhờ nội dung lôi cuốn không gây xao nhãng [distraction](xao nhãng), bài đăng đã [go viral](lan truyền nhanh chóng).

Hàng triệu người đã [click on](nhấp chuột vào) liên kết dẫn đến [site](trang web) của công ty. Nhận thấy đây là [latest news](tin tức mới nhất), một [journalist](nhà báo) đã liên hệ phỏng vấn [interview](phỏng vấn) nhà sáng lập để làm một bộ phim [documentary](phim tài liệu) truyền cảm hứng. Trong khi đó, tại [laboratory](phòng thí nghiệm), các [researcher](nhà nghiên cứu) và [expert](chuyên gia) đang dùng [technology](công nghệ) mới để phân tích [statistics](số liệu thống kê) từ [project](dự án), chuẩn bị cải tiến phiên bản [program](chương trình) phần mềm tiếp theo.`,
    englishStory: `A business established a company to develop a special product, combining both goods and digital services. To convince customers, an advertiser designed an eye-catching package and wrote an extremely detailed description to persuade buyers. They made a trial offer on social media. An influencer used their personal account on this platform to post a review sharing their experience. Thanks to engaging content without distraction, the post went viral.

Millions of people clicked on the link leading to the company's site. Realizing this was the latest news, a journalist reached out for an interview with the founder to make an inspiring documentary. Meanwhile, in the laboratory, researchers and experts are using new technology to analyze statistics from the project, preparing to improve the next version of the software program.`,
    vocabulary: [
      {
        word: 'business',
        phonetic: '/ˈbɪz.nɪs/',
        vietnamese: 'doanh nghiệp, hoạt động kinh doanh',
        definition: 'An organization or enterprising entity engaged in commercial, industrial, or professional activities.',
        example: 'Our main goal is to build a successful and sustainable online business.'
      },
      {
        word: 'company',
        phonetic: '/ˈkʌm.pə.ni/',
        vietnamese: 'công ty',
        definition: 'A commercial business or association of persons for carrying on a commercial or industrial enterprise.',
        example: 'She got a job as a software engineer at a multinational technology company.'
      },
      {
        word: 'product',
        phonetic: '/ˈprɒd.ʌkt/',
        vietnamese: 'sản phẩm',
        definition: 'An article or substance that is manufactured or refined for sale.',
        example: 'The company is launching its new eco-friendly product line next month.'
      },
      {
        word: 'goods',
        phonetic: '/ɡʊdz/',
        vietnamese: 'hàng hóa',
        definition: 'Merchandise or possessions; items of virtual or physical value that are traded.',
        example: 'Ships carry goods of all kinds across the ocean to different ports.'
      },
      {
        word: 'service',
        phonetic: '/ˈsɜː.vɪs/',
        vietnamese: 'dịch vụ',
        definition: 'The action of helping or doing work for someone, or a system supplying a public or private need.',
        example: 'Excellent customer service is key to retaining buyers.'
      },
      {
        word: 'customer',
        phonetic: '/ˈkʌs.tə.mər/',
        vietnamese: 'khách hàng',
        definition: 'A person or organization that buys goods or services from a store or business.',
        example: 'The salesman politely answered all the questions from the potential customer.'
      },
      {
        word: 'advertiser',
        phonetic: '/ˈæd.və.taɪ.zər/',
        vietnamese: 'nhà quảng cáo',
        definition: 'A person or company that advertises a product, service, event, or job vacancy.',
        example: 'The advertiser crafted a brilliant commercial that caught everyone\'s attention.'
      },
      {
        word: 'package',
        phonetic: '/ˈpæk.ɪdʒ/',
        vietnamese: 'bao bì, kiện hàng',
        definition: 'An object or group of objects wrapped in paper or packed in a box or container.',
        example: 'The delivery driver dropped off a heavy package at our front door.'
      },
      {
        word: 'description',
        phonetic: '/dɪˈskrɪp.ʃən/',
        vietnamese: 'bản miêu tả, sự miêu tả',
        definition: 'A spoken or written representation or account of a person, object, or event.',
        example: 'The product description on the website was clear and highly informative.'
      },
      {
        word: 'persuade',
        phonetic: '/pəˈsweɪd/',
        vietnamese: 'thuyết phục',
        definition: 'To provide a sound reason for someone to do something through reasoning or argument.',
        example: 'It is hard to persuade him to change his mind once he has decided.'
      },
      {
        word: 'offer',
        phonetic: '/ˈɒf.ər/',
        vietnamese: 'đề nghị, ưu đãi',
        definition: 'An expression of readiness to do or give something if desired, or a special discount.',
        example: 'The store has a special offer of buy-one-get-one-free this weekend.'
      },
      {
        word: 'social media',
        phonetic: '/ˌsəʊ.ʃəl ˈmiː.di.ə/',
        vietnamese: 'mạng xã hội',
        definition: 'Websites and applications that enable users to create and share content or to participate in social networking.',
        example: 'Most companies use social media to connect with their audience.'
      },
      {
        word: 'influencer',
        phonetic: '/ˈɪn.flu.ən.sər/',
        vietnamese: 'người có ảnh hưởng',
        definition: 'A person with the ability to influence potential buyers of a product or service by promoting or recommending the items on social media.',
        example: 'The beauty brand collaborated with a famous influencer to promote their new makeup set.'
      },
      {
        word: 'account',
        phonetic: '/əˈkaʊnt/',
        vietnamese: 'tài khoản',
        definition: 'A profile or registration on a website, app, or service which allows a user to access its features.',
        example: 'I forgot the password to my online banking account.'
      },
      {
        word: 'platform',
        phonetic: '/ˈplæt.fɔːm/',
        vietnamese: 'nền tảng',
        definition: 'A major piece of software or system, such as an operating system or social network, upon which other programs and content can run.',
        example: 'The educational platform offers a wide range of interactive courses.'
      },
      {
        word: 'post',
        phonetic: '/pəʊst/',
        vietnamese: 'bài đăng',
        definition: 'An item of content published online, typically on a social media website or blog.',
        example: 'Her latest post on Instagram received thousands of likes within an hour.'
      },
      {
        word: 'distraction',
        phonetic: '/dɪˈstræk.ʃən/',
        vietnamese: 'sự xao nhãng, mất tập trung',
        definition: 'A thing that prevents someone from giving full attention to something else.',
        example: 'I need a quiet study room where I can work without any distraction.'
      },
      {
        word: 'go viral',
        phonetic: '/ɡəʊ ˈvaɪə.rəl/',
        vietnamese: 'lan truyền nhanh chóng',
        definition: 'To become extremely popular and spread rapidly across the internet.',
        example: 'The funny cat video went viral on social media overnight.'
      },
      {
        word: 'click on',
        phonetic: '/klɪk ɒn/',
        vietnamese: 'nhấp chuột vào',
        definition: 'To press a button on a mouse or tap a screen to select or open a link, file, or image.',
        example: 'Please click on the link below to download the PDF file.'
      },
      {
        word: 'site',
        phonetic: '/saɪt/',
        vietnamese: 'trang web, địa điểm',
        definition: 'A website, or a specific location where something is or will be situated.',
        example: 'We visited the official museum site to buy our admission tickets in advance.'
      },
      {
        word: 'latest news',
        phonetic: '/ˈleɪ.tɪst njuːz/',
        vietnamese: 'tin tức mới nhất',
        definition: 'The most recent information about events or developments.',
        example: 'Turn on the radio if you want to hear the latest news about the storm.'
      },
      {
        word: 'journalist',
        phonetic: '/ˈdʒɜː.nə.lɪst/',
        vietnamese: 'nhà báo',
        definition: 'A person who writes for newspapers, magazines, or news websites or prepares news to be broadcast.',
        example: 'The brave journalist went to the frontlines to report on the conflict.'
      },
      {
        word: 'interview',
        phonetic: '/ˈɪn.tə.vjuː/',
        vietnamese: 'cuộc phỏng vấn, phỏng vấn',
        definition: 'A meeting of people face-to-face, especially for consultation, examination, or broadcasting.',
        example: 'She has a job interview tomorrow morning with the HR manager.'
      },
      {
        word: 'documentary',
        phonetic: '/ˌdɒk.jəˈmen.tər.i/',
        vietnamese: 'phim tài liệu',
        definition: 'A movie or a television or radio program that provides a factual record or report.',
        example: 'We watched a fascinating documentary about marine life in the Pacific Ocean.'
      },
      {
        word: 'laboratory',
        phonetic: '/ləˈbɒr.ə.tər.i/',
        vietnamese: 'phòng thí nghiệm',
        definition: 'A room or building equipped for scientific research, experiments, or measurement.',
        example: 'Scientists are working in the laboratory to find a cure for the disease.'
      },
      {
        word: 'researcher',
        phonetic: '/rɪˈsɜː.tʃər/',
        vietnamese: 'nhà nghiên cứu',
        definition: 'A person who carries out academic or scientific research.',
        example: 'The lead researcher presented her groundbreaking findings at the conference.'
      },
      {
        word: 'expert',
        phonetic: '/ˈek.spɜːt/',
        vietnamese: 'chuyên gia',
        definition: 'A person who has a comprehensive and authoritative knowledge of or skill in a particular area.',
        example: 'We invited an economic expert to discuss the future trends of the market.'
      },
      {
        word: 'technology',
        phonetic: '/tekˈnɒl.ə.dʒi/',
        vietnamese: 'công nghệ',
        definition: 'The application of scientific knowledge for practical purposes, especially in industry.',
        example: 'Modern technology makes it incredibly easy to stay in touch with friends.'
      },
      {
        word: 'statistics',
        phonetic: '/stəˈtɪs.tɪks/',
        vietnamese: 'số liệu thống kê',
        definition: 'The practice or science of collecting and analyzing numerical data in large quantities.',
        example: 'Government statistics show a steady decrease in unemployment rates.'
      },
      {
        word: 'project',
        phonetic: '/ˈprɒdʒ.ekt/',
        vietnamese: 'dự án, đề án',
        definition: 'An individual or collaborative enterprise that is carefully planned and designed to achieve a particular aim.',
        example: 'The team completed the research project ahead of the scheduled deadline.'
      },
      {
        word: 'program',
        phonetic: '/ˈprəʊ.ɡræm/',
        vietnamese: 'chương trình',
        definition: 'A set of coded instructions to enable a machine to perform a specified task, or a planned series of events.',
        example: 'He wrote a simple computer program that organizes files automatically.'
      }
    ]
  },
  {
    id: 'journey-travel-sports',
    title: 'Journey, Travel & Sports',
    description: 'Hành trình, Du lịch & Thể thao - Khám phá các hoạt động phiêu lưu dã ngoại, thám hiểm thiên nhiên và rèn luyện thể lực.',
    category: 'Travel',
    vietnameseStory: `Sau khi giành chiến thắng trong một cuộc [competition](cuộc thi) đầy kịch tính, người [athlete](vận động viên) quyết định [travel abroad](đi du lịch nước ngoài). Chuyến đi [trip](chuyến đi) này không chỉ quanh quẩn trên [tennis court](sân quần vợt) hay chạy bộ [jog](chạy bộ) rèn thể lực, mà là một [journey](hành trình) hướng tới sự [adventure](phiêu lưu) đích thực. Ngay khi máy bay [take off](cất cánh), anh đã tưởng tượng về chuyến [expedition](cuộc viễn chinh) sắp tới của mình. Anh muốn thực hiện một cuộc [exploration](sự thám hiểm) để [explore](thám hiểm) những vùng đất hoang sơ và [discover](phát hiện) những cảnh quan thiên nhiên kỳ vĩ. Để chuẩn bị thể lực tốt nhất, anh đã dành nhiều tháng để [practice](luyện tập) các kỹ năng như [climb](leo trèo) vách đá thẳng đứng, [hike](đi bộ đường dài) qua những cung đường hiểm trở, và [dive](lặn) dưới đại dương sâu thẳm cùng các môn [extreme sports](thể thao mạo hiểm).`,
    englishStory: `After winning a dramatic competition, the athlete decided to travel abroad. This trip was not just about staying on the tennis court or jogging to stay fit; it was a journey toward true adventure. As soon as the plane took off, he imagined his upcoming expedition. He wanted to undertake an exploration to explore pristine lands and discover majestic natural landscapes. To prepare his physical condition in the best way, he had spent many months practicing skills such as climbing steep cliffs, hiking through rugged paths, and diving deep in the ocean along with other extreme sports.`,
    vocabulary: [
      {
        word: 'competition',
        phonetic: '/ˌkɒm.pəˈtɪʃ.ən/',
        vietnamese: 'cuộc thi, sự cạnh tranh',
        definition: 'An event or contest in which people compete.',
        example: 'She won first prize in the national piano competition.'
      },
      {
        word: 'athlete',
        phonetic: '/ˈæθ.liːt/',
        vietnamese: 'vận động viên',
        definition: 'A person who is proficient in sports and other forms of physical exercise.',
        example: 'Professional athletes train for several hours every day.'
      },
      {
        word: 'travel abroad',
        phonetic: '/ˈtræv.əl əˈbrɔːd/',
        vietnamese: 'đi du lịch nước ngoài',
        definition: 'To make a journey to or in a foreign country.',
        example: 'He plans to travel abroad to experience different cultures next summer.'
      },
      {
        word: 'trip',
        phonetic: '/trɪp/',
        vietnamese: 'chuyến đi',
        definition: 'An act of traveling from one place to another, usually for pleasure.',
        example: 'We had a wonderful weekend trip to the countryside.'
      },
      {
        word: 'tennis court',
        phonetic: '/ˈten.ɪs kɔːt/',
        vietnamese: 'sân quần vợt',
        definition: 'The rectangular court on which tennis is played.',
        example: 'The players gathered at the local tennis court for the match.'
      },
      {
        word: 'jog',
        phonetic: '/dʒɒɡ/',
        vietnamese: 'chạy bộ',
        definition: 'To run at a steady, gentle pace, especially on a regular basis as a form of physical exercise.',
        example: 'I like to jog in the park early in the morning.'
      },
      {
        word: 'journey',
        phonetic: '/ˈdʒɜː.ni/',
        vietnamese: 'hành trình',
        definition: 'An act of traveling from one place to another.',
        example: 'The long train journey across the country was tiring but beautiful.'
      },
      {
        word: 'adventure',
        phonetic: '/ədˈven.tʃər/',
        vietnamese: 'sự phiêu lưu, chuyến phiêu lưu',
        definition: 'An unusual and exciting, typically hazardous, experience or activity.',
        example: 'The kids set off into the forest looking for a fun adventure.'
      },
      {
        word: 'take off',
        phonetic: '/teɪk ɒf/',
        vietnamese: 'cất cánh',
        definition: '(Of an aircraft) to leave the ground and rise into the air.',
        example: 'The airplane is scheduled to take off at exactly nine o\'clock.'
      },
      {
        word: 'expedition',
        phonetic: '/ˌek.spəˈdɪʃ.ən/',
        vietnamese: 'cuộc viễn chinh, đoàn thám hiểm',
        definition: 'A journey undertaken by a group of people with a particular purpose, especially that of exploration or scientific research.',
        example: 'They organized an scientific expedition to the Antarctic.'
      },
      {
        word: 'exploration',
        phonetic: '/ˌek.spləˈreɪ.ʃən/',
        vietnamese: 'sự thám hiểm',
        definition: 'The action of traveling in or through an unfamiliar area in order to learn about it.',
        example: 'Space exploration has led to many amazing technological breakthroughs.'
      },
      {
        word: 'explore',
        phonetic: '/ɪkˈsplɔːr/',
        vietnamese: 'thám hiểm, khám phá',
        definition: 'To travel through an unfamiliar area in order to learn about or familiarize oneself with it.',
        example: 'We want to explore the old part of the city on foot.'
      },
      {
        word: 'discover',
        phonetic: '/dɪˈskʌv.ər/',
        vietnamese: 'phát hiện, khám phá ra',
        definition: 'To find unexpectedly or during a search.',
        example: 'They discovered a hidden pathway that led directly to the waterfall.'
      },
      {
        word: 'practice',
        phonetic: '/ˈpræk.tɪs/',
        vietnamese: 'luyện tập',
        definition: 'Perform an activity or exercise a skill repeatedly or regularly in order to improve or maintain proficiency.',
        example: 'You must practice speaking English every day to improve.'
      },
      {
        word: 'climb',
        phonetic: '/klaɪm/',
        vietnamese: 'leo trèo',
        definition: 'To go up or ascend, especially by using the hands and feet.',
        example: 'They managed to climb to the peak of the mountain before sunset.'
      },
      {
        word: 'hike',
        phonetic: '/haɪk/',
        vietnamese: 'đi bộ đường dài dã ngoại',
        definition: 'To go for a long walk, especially in the country or as a recreational activity.',
        example: 'We plan to hike through the national park this Saturday.'
      },
      {
        word: 'dive',
        phonetic: '/daɪv/',
        vietnamese: 'lặn',
        definition: 'To plunge headfirst into water, or swim deep underwater using scuba gear.',
        example: 'They love to dive and explore the beautiful coral reefs.'
      },
      {
        word: 'extreme sports',
        phonetic: '/ɪkˌstriːm ˈspɔːts/',
        vietnamese: 'thể thao mạo hiểm',
        definition: 'Recreational activities perceived as involving a high degree of risk, speed, or physical exertion.',
        example: 'Skydiving and mountain biking are popular extreme sports.'
      }
    ]
  },
  {
    id: 'emotions-mindset-traits',
    title: 'Emotions, Mindset & Traits',
    description: 'Cảm xúc, Tư duy & Phẩm chất - Học cách quản lý cảm xúc tiêu cực, thúc đẩy tư duy tích cực, sáng tạo và rèn luyện các phẩm chất cần thiết để vượt qua khó khăn.',
    category: 'Emotions',
    vietnameseStory: `Đứng trước những thử thách học tập đầy [difficult](khó khăn), bạn có thể cảm thấy [worry](lo lắng), [anxious](bồn chồn), [afraid](lo sợ) và đầy [fear](nỗi sợ hãi). Những cảm xúc tiêu cực này đôi khi thật [annoying](gây phiền toái, khó chịu). Nhưng hãy tìm cách biến chúng thành cảm giác [excited](hào hứng) hoặc [amazed](ngạc nhiên, sửng sốt) khi phát hiện ra tri thức mới nhờ tính [curiosity](tò mò, hiếu kỳ).

Khi bạn nhận được sự [respect](tôn trọng) từ thầy cô và bạn bè, bạn sẽ thấy mình có thêm sự [motivated](động lực) mạnh mẽ. Cho dù con đường phía trước có [tough](khó khăn, cứng rắn) và bạn phải [struggle](đấu tranh, chật vật), thậm chí đôi lúc [fail](thất bại), nhưng nếu bạn tiếp tục nỗ lực một cách [active](tích cực), tư duy [creative](sáng tạo) và chuẩn bị thật [careful](cẩn thận), bạn chắc chắn sẽ gặt hái thành công. Cảm giác chinh phục được đỉnh cao sẽ vô cùng [pleasant](dễ chịu) và đó là kết quả xứng đáng mà bất cứ ai cũng [look forward to](trông mong, mong đợi) cùng niềm [hope](hy vọng).`,
    englishStory: `Faced with difficult academic challenges, you may feel worry, anxious, afraid, and full of fear. These negative emotions can sometimes be really annoying. But find ways to turn them into feeling excited or amazed when discovering new knowledge, thanks to your curiosity.

When you receive respect from teachers and friends, you will feel highly motivated. Even though the road ahead is tough and you have to struggle, or even fail at times, if you continue to make active efforts, think in a creative way, and prepare with careful attention, you will surely achieve success. The feeling of conquering the peak will be extremely pleasant, and that is the well-deserved outcome that anyone looks forward to with hope.`,
    vocabulary: [
      {
        word: 'difficult',
        phonetic: '/ˈdɪf.ɪ.kəlt/',
        vietnamese: 'khó khăn, gian nan',
        definition: 'Needing much effort or skill to accomplish, deal with, or understand.',
        example: 'Learning a new language can be difficult at first, but it gets easier with practice.'
      },
      {
        word: 'worry',
        phonetic: '/ˈwʌr.i/',
        vietnamese: 'lo lắng, phiền muộn',
        definition: 'To feel or cause to feel anxious or troubled about actual or potential problems.',
        example: 'There is no need to worry about the exam because you have studied hard.'
      },
      {
        word: 'anxious',
        phonetic: '/ˈæŋk.ʃəs/',
        vietnamese: 'bồn chồn, lo âu',
        definition: 'Experiencing worry, unease, or nervousness, typically about an imminent event or something with an uncertain outcome.',
        example: 'She felt extremely anxious while waiting for her test results.'
      },
      {
        word: 'afraid',
        phonetic: '/əˈfreɪd/',
        vietnamese: 'lo sợ, sợ hãi',
        definition: 'Feeling fear or anxiety; frightened.',
        example: 'Don\'t be afraid to ask questions if you do not understand.'
      },
      {
        word: 'fear',
        phonetic: '/fɪər/',
        vietnamese: 'nỗi sợ hãi, sự sợ hãi',
        definition: 'An unpleasant emotion caused by the belief that someone or something is dangerous, likely to cause pain, or a threat.',
        example: 'She overcame her fear of public speaking through practice.'
      },
      {
        word: 'annoying',
        phonetic: '/əˈnɔɪ.ɪŋ/',
        vietnamese: 'gây phiền toái, khó chịu',
        definition: 'Causing irritation or annoyance.',
        example: 'The loud constant noise from the street was highly annoying.'
      },
      {
        word: 'excited',
        phonetic: '/ɪkˈsaɪ.tɪd/',
        vietnamese: 'hào hứng, phấn khích',
        definition: 'Very enthusiastic and eager about something.',
        example: 'The children were excited about their upcoming school field trip.'
      },
      {
        word: 'amazed',
        phonetic: '/əˈmeɪzd/',
        vietnamese: 'ngạc nhiên, sửng sốt',
        definition: 'Filled with great surprise or wonder.',
        example: 'We were amazed by the breathtaking views of the star-filled night sky.'
      },
      {
        word: 'curiosity',
        phonetic: '/ˌkjʊə.riˈɒs.ə.ti/',
        vietnamese: 'tò mò, hiếu kỳ',
        definition: 'A strong desire to know or learn something.',
        example: 'A child\'s natural curiosity drives them to explore everything around them.'
      },
      {
        word: 'respect',
        phonetic: '/rɪˈspekt/',
        vietnamese: 'tôn trọng, kính trọng',
        definition: 'A feeling of deep admiration for someone or something elicited by their abilities, qualities, or achievements.',
        example: 'You should always treat other people with kindness and respect.'
      },
      {
        word: 'motivated',
        phonetic: '/ˈməʊ.tɪ.veɪ.tɪd/',
        vietnamese: 'được thúc đẩy, có động lực',
        definition: 'Having a strong reason, enthusiasm, or incentive to do something.',
        example: 'She is a highly motivated student who works hard to achieve her goals.'
      },
      {
        word: 'tough',
        phonetic: '/tʌf/',
        vietnamese: 'khó khăn, cứng rắn',
        definition: 'Difficult to deal with or endure.',
        example: 'The competition was tough, but we managed to win in the end.'
      },
      {
        word: 'struggle',
        phonetic: '/ˈstrʌɡ.əl/',
        vietnamese: 'đấu tranh, chật vật',
        definition: 'To strive to achieve or attain something in the face of difficulties or resistance.',
        example: 'Many students struggle to manage their time between studying and resting.'
      },
      {
        word: 'fail',
        phonetic: '/feɪl/',
        vietnamese: 'thất bại',
        definition: 'Be unsuccessful in achieving one\'s goal or purpose.',
        example: 'Even if we fail at first, we can learn from our mistakes and try again.'
      },
      {
        word: 'active',
        phonetic: '/ˈæk.tɪv/',
        vietnamese: 'tích cực, hoạt bát',
        definition: 'Engaging or ready to engage in physically or mentally energetic pursuits, or taking direct positive actions.',
        example: 'He takes an active role in school volunteer programs.'
      },
      {
        word: 'creative',
        phonetic: '/kriˈeɪ.tɪv/',
        vietnamese: 'sáng tạo',
        definition: 'Relating to or involving the imagination or original ideas, especially in the production of an artistic work.',
        example: 'We need creative solutions to address complex global challenges.'
      },
      {
        word: 'careful',
        phonetic: '/ˈkeə.fəl/',
        vietnamese: 'cẩn thận, chu đáo',
        definition: 'Making sure of avoiding potential danger, mishap, or error; cautious.',
        example: 'Please be careful when walking on the slippery ice.'
      },
      {
        word: 'pleasant',
        phonetic: '/ˈplez.ənt/',
        vietnamese: 'dễ chịu, thoải mái',
        definition: 'Giving a sense of happy satisfaction or enjoyment.',
        example: 'We spent a highly pleasant afternoon reading books by the lake.'
      },
      {
        word: 'look forward to',
        phonetic: '/lʊk ˈfɔː.wəd tuː/',
        vietnamese: 'trông mong, mong đợi',
        definition: 'To anticipate something pleasant with eager anticipation.',
        example: 'I look forward to meeting my grandparents next week.'
      },
      {
        word: 'hope',
        phonetic: '/həʊp/',
        vietnamese: 'hy vọng',
        definition: 'A feeling of expectation and desire for a certain thing to happen.',
        example: 'The doctor gave us some hope that the patient would recover fully.'
      }
    ]
  },
  {
    id: 'abstract-concepts-actions',
    title: 'Abstract Concepts & Actions',
    description: 'Các khái niệm & Hành động chung - Tìm kiếm cơ hội, giải quyết khó khăn, và định hình chiến lược để đạt tới thành công.',
    category: 'Concepts',
    vietnameseStory: `Trong thế giới [modern](hiện đại) ngày nay, con người luôn muốn tìm kiếm những [opportunity](cơ hội) mới để khẳng định bản thân. Một ví dụ [typical](điển hình) là việc thiết lập các dự án khởi nghiệp có [scale](quy mô) từ nhỏ đến [massive](to lớn). Tuy nhiên, trên hành trình này, không có gì là [perfect](hoàn hảo) ngay từ đầu. Bạn phải [solve](giải quyết) vô số vấn đề khó khăn và [avoid](tránh) việc đưa ra các quyết định [wrong](sai lầm). Khi bạn tiến hành hoạt động, mọi tác động dù [tiny](rất nhỏ) cũng có thể tạo ra một [effect](tác động, hiệu ứng) dây chuyền lên [whole](toàn bộ) hệ thống.

Bạn cần có [vision](tầm nhìn) và [ability](năng lực) để phân biệt cái gì là [real](thật) và cái gì là [fake](giả). Nếu dự án gặp [fault](lỗi), đừng vội [give up](từ bỏ) mà hãy nỗ lực [improve](cải thiện) và [develop](phát triển) sản phẩm của mình theo một [strategy](chiến lược) rõ ràng hơn. Để thu hút khách hàng, bạn phải [persuade](thuyết phục) họ rằng sản phẩm của bạn là [unique](độc nhất) và vô cùng [attractive](thu hút). Chỉ khi dám hành động và không ngừng học hỏi từ thất bại, bạn mới đạt được [success](thành công) như mong đợi.`,
    englishStory: `In today's modern world, people always want to look for new opportunities to assert themselves. A typical example is establishing startup projects with a scale ranging from small to massive. However, on this journey, nothing is perfect from the start. You have to solve countless difficult problems and avoid making wrong decisions. When you take action, every tiny impact can create a chain effect on the whole system.

You need to have the vision and ability to distinguish what is real and what is fake. If the project encounters a fault, do not easily give up, but strive to improve and develop your product under a clearer strategy. To attract customers, you must persuade them that your product is unique and highly attractive. Only when you dare to act and constantly learn from failures will you achieve your expected success.`,
    vocabulary: [
      {
        word: 'modern',
        phonetic: '/ˈmɒd.ən/',
        vietnamese: 'hiện đại',
        definition: 'Relating to the present or recent times as opposed to the remote past.',
        example: 'Modern technology has made communication much easier and faster.'
      },
      {
        word: 'opportunity',
        phonetic: '/ˌɒp.əˈtʃuː.nə.ti/',
        vietnamese: 'cơ hội',
        definition: 'A set of circumstances that makes it possible to do something.',
        example: 'Studying abroad is a great opportunity to learn about new cultures.'
      },
      {
        word: 'typical',
        phonetic: '/ˈtɪp.ɪ.kəl/',
        vietnamese: 'điển hình, tiêu biểu',
        definition: 'Having the distinctive qualities of a particular type of person or thing.',
        example: 'A typical working day for him begins at eight in the morning.'
      },
      {
        word: 'scale',
        phonetic: '/skeɪl/',
        vietnamese: 'quy mô, phạm vi',
        definition: 'The relative size or extent of something.',
        example: 'They are planning to expand their business on a global scale.'
      },
      {
        word: 'massive',
        phonetic: '/ˈmæs.ɪv/',
        vietnamese: 'to lớn, khổng lồ',
        definition: 'Large and heavy or solid; exceptionally large in scale or intensity.',
        example: 'The storm caused massive damage to the coastal towns.'
      },
      {
        word: 'perfect',
        phonetic: '/ˈpɜː.fekt/',
        vietnamese: 'hoàn hảo',
        definition: 'Having all the required or desirable elements, qualities, or characteristics; as good as it is possible to be.',
        example: 'She spoke perfect English with a clear accent.'
      },
      {
        word: 'solve',
        phonetic: '/sɒlv/',
        vietnamese: 'giải quyết, tìm ra lời giải',
        definition: 'To find an answer to, explanation for, or means of effectively dealing with a problem or mystery.',
        example: 'The team worked together to solve the complex puzzle.'
      },
      {
        word: 'avoid',
        phonetic: '/əˈvɔɪd/',
        vietnamese: 'tránh, né tránh',
        definition: 'To keep away from or stop oneself from doing something.',
        example: 'You should avoid driving during the heavy rush hour.'
      },
      {
        word: 'wrong',
        phonetic: '/rɒŋ/',
        vietnamese: 'sai, sai lầm',
        definition: 'Not correct or true; incorrect.',
        example: 'He took the wrong turn and ended up getting lost.'
      },
      {
        word: 'tiny',
        phonetic: '/ˈtaɪ.ni/',
        vietnamese: 'rất nhỏ, tí hon',
        definition: 'Very small indeed.',
        example: 'The baby bird had tiny feathers and could not fly yet.'
      },
      {
        word: 'effect',
        phonetic: '/ɪˈfekt/',
        vietnamese: 'tác động, hiệu ứng, ảnh hưởng',
        definition: 'A change which is a result or consequence of an action or other cause.',
        example: 'The warm climate had a positive effect on his health.'
      },
      {
        word: 'whole',
        phonetic: '/həʊl/',
        vietnamese: 'toàn bộ, tất cả',
        definition: 'All of; entire.',
        example: 'The whole family gathered together for the traditional feast.'
      },
      {
        word: 'vision',
        phonetic: '/ˈvɪʒ.ən/',
        vietnamese: 'tầm nhìn, thị lực',
        definition: 'The ability to think about or plan the future with imagination or wisdom, or the faculty of sight.',
        example: 'The company founder had a clear vision for the brand\'s future.'
      },
      {
        word: 'ability',
        phonetic: '/əˈbɪl.ə.ti/',
        vietnamese: 'năng lực, khả năng',
        definition: 'Possession of the means or skills to do something.',
        example: 'He has a remarkable ability to learn new things quickly.'
      },
      {
        word: 'real',
        phonetic: '/rɪəl/',
        vietnamese: 'thật, thực tế',
        definition: 'Actually existing as a thing or occurring in fact; not imagined or supposed.',
        example: 'This ring is made of real gold, not cheap metal.'
      },
      {
        word: 'fake',
        phonetic: '/feɪk/',
        vietnamese: 'giả, làm giả',
        definition: 'Not genuine; counterfeit or imitation.',
        example: 'The painting was a fake, not the original work of the famous artist.'
      },
      {
        word: 'fault',
        phonetic: '/fɔːlt/',
        vietnamese: 'lỗi, khuyết điểm',
        definition: 'An unattractive or unsatisfactory feature, or a mistake for which one is responsible.',
        example: 'The engineers discovered a major technical fault in the system.'
      },
      {
        word: 'give up',
        phonetic: '/ɡɪv ʌp/',
        vietnamese: 'từ bỏ',
        definition: 'To stop making an effort; resign oneself to failure.',
        example: 'Never give up on your dreams, no matter how hard they seem.'
      },
      {
        word: 'improve',
        phonetic: '/ɪmˈpruːv/',
        vietnamese: 'cải thiện, nâng cao',
        definition: 'To make or become better.',
        example: 'He practices every day to improve his English pronunciation.'
      },
      {
        word: 'develop',
        phonetic: '/dɪˈvel.əp/',
        vietnamese: 'phát triển',
        definition: 'To grow or cause to grow and become more mature, advanced, or elaborate.',
        example: 'The country is working hard to develop its renewable energy sources.'
      },
      {
        word: 'strategy',
        phonetic: '/ˈstræt.ə.dʒi/',
        vietnamese: 'chiến lược',
        definition: 'A plan of action or policy designed to achieve a major or overall aim.',
        example: 'The company developed a clever marketing strategy to boost its sales.'
      },
      {
        word: 'persuade',
        phonetic: '/pəˈsweɪd/',
        vietnamese: 'thuyết phục',
        definition: 'To convince someone to do or believe something through reasoning or argument.',
        example: 'We managed to persuade our parents to let us go on the trip.'
      },
      {
        word: 'unique',
        phonetic: '/juːˈniːk/',
        vietnamese: 'độc nhất, độc đáo',
        definition: 'Being the only one of its kind; unlike anything else.',
        example: 'Every individual has a unique set of fingerprints.'
      },
      {
        word: 'attractive',
        phonetic: '/əˈtræk.tɪv/',
        vietnamese: 'thu hút, lôi cuốn, hấp dẫn',
        definition: 'Pleasing or appealing to the senses, or having features that arouse interest.',
        example: 'The packaging is highly attractive and catches the customer\'s eye.'
      },
      {
        word: 'success',
        phonetic: '/səkˈses/',
        vietnamese: 'thành công',
        definition: 'The accomplishment of an aim or purpose.',
        example: 'Hard work and determination are the keys to achieving success.'
      }
    ]
  },
  {
    id: 'daily-life-habits-growth',
    title: 'Daily Life, Habits & Personal Growth',
    description: 'Đời sống hàng ngày, Thói quen & Phát triển bản thân - Rèn luyện thói quen lành mạnh, cân bằng cuộc sống và định hình lối đi riêng để phát triển bản thân.',
    category: 'Growth',
    vietnameseStory: `Sau khi [grow up](trưởng thành), Nam quyết định thiết lập một [habit](thói quen) lành mạnh [instead of](thay vì) lối sống lười biếng trước đây. Anh nhận ra mình [almost](hầu như, gần như) không bao giờ vận động và luôn có [tend to](xu hướng) thức khuya. Để tích lũy thêm nhiều [experience](trải nghiệm, kinh nghiệm) sống tích cực, anh bắt đầu lên một [schedule](lịch trình) mới. Anh cố gắng [spend time](dành thời gian) cho các [activity](hoạt động) bổ ích và tìm cách duy trì sự [balance](cân bằng) giữa công việc và cuộc sống [life](cuộc sống).

Mỗi ngày, Nam tập luyện một cách [regularly](thường xuyên), duy trì các thói quen này [during](trong suốt) cả tuần chứ không chỉ vào ngày nghỉ. Mọi thứ ban đầu không hề dễ dàng, nhưng anh tự nhủ đây là một quá trình [normal](bình thường) mà ai cũng phải trải qua. Anh không còn muốn làm một người [ordinary](bình thường, thông thường) nữa. Anh tìm kiếm một phòng tập [suitable](phù hợp) và chọn những bộ đồ thể thao [fit](vừa vặn, phù hợp) nhất để luôn [ready](sẵn sàng) hành động.

Việc tự tay [plan](lên kế hoạch) và [begin](bắt đầu) một ngày mới bằng một sở thích [hobby](sở thích) lành mạnh như chạy bộ mang lại cho anh cảm giác [amazing](kinh ngạc, tuyệt vời). Anh luôn sẵn sàng [try](thử, cố gắng) những điều mới và tự mình [choose](lựa chọn) lối đi riêng. Sau khi [complete](hoàn thành) mục tiêu ngày, anh [feel](cảm thấy) vô cùng sảng khoái và tự hào về bản thân.`,
    englishStory: `After growing up, Nam decided to establish a healthy habit instead of his previous lazy lifestyle. He realized he almost never exercised and always tended to stay up late. To accumulate more positive life experiences, he started setting up a new schedule. He tried to spend time on useful activities and find a way to maintain a balance between work and life.

Every day, Nam exercised regularly, maintaining these habits during the entire week and not just on holidays. Everything was not easy at first, but he told himself this was a normal process that everyone had to go through. He no longer wanted to be an ordinary person. He searched for a suitable gym and chose the sports clothes that fit best to always be ready for action.

Planning and beginning a new day by himself with a healthy hobby like jogging brought him an amazing feeling. He is always ready to try new things and choose his own path. After completing his daily goal, he felt extremely refreshed and proud of himself.`,
    vocabulary: [
      {
        word: 'grow up',
        phonetic: '/ɡrəʊ ʌp/',
        vietnamese: 'trưởng thành',
        definition: 'To progress toward maturity, or to become fully grown.',
        example: 'When children grow up, they usually become more independent.'
      },
      {
        word: 'habit',
        phonetic: '/ˈhæb.ɪt/',
        vietnamese: 'thói quen',
        definition: 'A settled or regular tendency or practice, especially one that is hard to give up.',
        example: 'Reading books before going to bed is a very healthy habit.'
      },
      {
        word: 'instead of',
        phonetic: '/ɪnˈsted ɒv/',
        vietnamese: 'thay vì',
        definition: 'As an alternative or substitute for.',
        example: 'I decided to walk to the office instead of taking a taxi.'
      },
      {
        word: 'almost',
        phonetic: '/ˈɔːl.məʊst/',
        vietnamese: 'hầu như, gần như',
        definition: 'Not quite; very nearly.',
        example: 'He is so busy that he has almost no time to rest.'
      },
      {
        word: 'tend to',
        phonetic: '/tend tuː/',
        vietnamese: 'có xu hướng, hướng đến',
        definition: 'To be likely to behave in a particular way or have a certain characteristic.',
        example: 'People tend to eat more junk food when they are highly stressed.'
      },
      {
        word: 'experience',
        phonetic: '/ɪkˈsˈpɪə.ri.əns/',
        vietnamese: 'trải nghiệm, kinh nghiệm',
        definition: 'Practical contact with and observation of facts or events, or knowledge gained over time.',
        example: 'Volunteering is a great way to gain valuable life experience.'
      },
      {
        word: 'schedule',
        phonetic: '/ˈʃed.juːl/',
        vietnamese: 'lịch trình, thời gian biểu',
        definition: 'A plan for carrying out a process or procedure, giving a list of intended events and times.',
        example: 'She has a very tight study schedule this semester.'
      },
      {
        word: 'spend time',
        phonetic: '/spend taɪm/',
        vietnamese: 'dành thời gian',
        definition: 'To pass time doing a particular activity or in a particular place.',
        example: 'He likes to spend time with his family on weekends.'
      },
      {
        word: 'activity',
        phonetic: '/ækˈtɪv.ə.ti/',
        vietnamese: 'hoạt động',
        definition: 'A thing that a person or group does or has done, or a condition of active motion.',
        example: 'The school offers a wide variety of extracurricular activities.'
      },
      {
        word: 'balance',
        phonetic: '/ˈbæl.əns/',
        vietnamese: 'sự cân bằng, cân bằng',
        definition: 'An even distribution of weight, or a state of equilibrium between different elements.',
        example: 'It is important to maintain a healthy work-life balance.'
      },
      {
        word: 'life',
        phonetic: '/laɪf/',
        vietnamese: 'cuộc sống, đời sống',
        definition: 'The condition that distinguishes animals and plants from inorganic matter, or a person\'s existence.',
        example: 'He wants to live a peaceful and happy life in the countryside.'
      },
      {
        word: 'regularly',
        phonetic: '/ˈreɡ.jə.lə.li/',
        vietnamese: 'thường xuyên, đều đặn',
        definition: 'With a constant or definite pattern, or at regular intervals.',
        example: 'You should drink water regularly throughout the day.'
      },
      {
        word: 'during',
        phonetic: '/ˈdjʊə.rɪŋ/',
        vietnamese: 'trong suốt, trong thời gian',
        definition: 'Throughout the course or duration of a period of time.',
        example: 'The museum remains closed during the major holidays.'
      },
      {
        word: 'normal',
        phonetic: '/ˈnɔː.məl/',
        vietnamese: 'bình thường',
        definition: 'Conforming to a standard; usual, typical, or expected.',
        example: 'It is normal to feel nervous before giving an important presentation.'
      },
      {
        word: 'ordinary',
        phonetic: '/ˈɔː.dən.əri/',
        vietnamese: 'bình thường, thông thường',
        definition: 'With no special or distinctive features; normal or average.',
        example: 'She was just an ordinary girl who loved reading fairy tales.'
      },
      {
        word: 'suitable',
        phonetic: '/ˈsuː.tə.bəl/',
        vietnamese: 'phù hợp, thích hợp',
        definition: 'Right or appropriate for a particular person, purpose, or situation.',
        example: 'The small quiet room is suitable for a deep study session.'
      },
      {
        word: 'fit',
        phonetic: '/fɪt/',
        vietnamese: 'vừa vặn, phù hợp, khỏe mạnh',
        definition: 'Be of the right shape and size for, or in good physical health.',
        example: 'These running shoes fit perfectly and feel very comfortable.'
      },
      {
        word: 'ready',
        phonetic: '/ˈred.i/',
        vietnamese: 'sẵn sàng',
        definition: 'In a suitable state for an activity or situation; fully prepared.',
        example: 'Please let me know when dinner is ready.'
      },
      {
        word: 'plan',
        phonetic: '/plæn/',
        vietnamese: 'lên kế hoạch, kế hoạch',
        definition: 'A detailed proposal for doing or achieving something, or to decide on and arrange in advance.',
        example: 'They are making a plan for their summer vacation.'
      },
      {
        word: 'begin',
        phonetic: '/bɪˈɡɪn/',
        vietnamese: 'bắt đầu',
        definition: 'Start; perform the first part of an action or activity.',
        example: 'The movie is scheduled to begin at exactly eight o\'clock.'
      },
      {
        word: 'hobby',
        phonetic: '/ˈhɒb.i/',
        vietnamese: 'sở thích, thú vui',
        definition: 'An activity done regularly in one\'s leisure time for pleasure.',
        example: 'His main hobby is collecting rare stamps and coins.'
      },
      {
        word: 'amazing',
        phonetic: '/əˈmeɪ.zɪŋ/',
        vietnamese: 'kinh ngạc, tuyệt vời',
        definition: 'Causing great surprise or sudden wonder.',
        example: 'The view of the mountain peak was absolutely amazing.'
      },
      {
        word: 'try',
        phonetic: '/traɪ/',
        vietnamese: 'thử, cố gắng',
        definition: 'Make an attempt or effort to do something, or test something.',
        example: 'You should try this delicious homemade soup.'
      },
      {
        word: 'choose',
        phonetic: '/tʃuːz/',
        vietnamese: 'lựa chọn, chọn',
        definition: 'Pick out or select someone or something as being the best of two or more alternatives.',
        example: 'It took him a long time to choose the perfect gift.'
      },
      {
        word: 'complete',
        phonetic: '/kəmˈpliːt/',
        vietnamese: 'hoàn thành',
        definition: 'Finish making or doing, or having all the necessary parts.',
        example: 'The construction work is expected to be complete by tomorrow.'
      },
      {
        word: 'feel',
        phonetic: '/fiːl/',
        vietnamese: 'cảm thấy',
        definition: 'Be conscious of a person, object, or physical/mental state.',
        example: 'I feel very happy and relaxed after a good night\'s sleep.'
      }
    ]
  },
  {
    id: 'archaeology-history-mysteries',
    title: 'Archaeology, History & Ancient Mysteries',
    description: 'Khảo cổ, Lịch sử & Những bí ẩn cổ đại - Đồng hành cùng đoàn khảo cổ thám hiểm những di tích cổ xưa, giải mã các hiện tượng kỳ bí và tìm kiếm kho báu lịch sử.',
    category: 'History',
    vietnameseStory: `Một đoàn thám hiểm đang lên đường [search](tìm kiếm) một [ancient](cổ xưa) [temple](ngôi đền) được đồn đại là nơi [bury](chôn cất) lăng mộ [tomb](lăng mộ) của một vị vua từ nhiều [century](thế kỷ) trước. Di tích này đã bị [abandoned](bị bỏ hoang) từ lâu và nằm ở một [location](vị trí) vô cùng hẻo lánh. Vượt qua một [distance](khoảng cách) rất [far](xa), họ cuối cùng cũng đứng [in front of](ở phía trước) công trình kỳ vĩ này.

Ngôi đền có lối kiến trúc rất [unusual](bất thường, khác thường), tạo nên một cảm giác đầy [mystery](bí ẩn). Những lối đi [hidden](ẩn, giấu kín) bên trong luôn chứa đựng nhiều điều bất ngờ. Dù được xây dựng chủ yếu bằng những khối đá [heavy](nặng) thay vì [steel](thép) hay [concrete](bê tông) như thời hiện đại, công trình vẫn sừng sững qua thời gian. Đoàn khảo cổ men theo những hành lang [straight](thẳng) tắp, cố gắng xác định xem các bức tượng [look like](trông giống như) thứ gì và có [shape](hình dạng) ra sao.

Họ tìm thấy một [source](nguồn) tài liệu cổ cho thấy [fact](sự thật) là nơi đây từng bị bao phủ bởi bóng tối [dark](bóng tối) suốt nhiều [decade](thập kỷ). Dù phải đối mặt với [several](một vài) hiện tượng [strange](kỳ lạ) và một số thành viên suýt bị [missing](bị mất, thất lạc), họ vẫn quyết định [wait](chờ đợi) để khám phá đến tận cùng bằng cách đi [across](băng qua) những khu vực nguy hiểm nhất.`,
    englishStory: `An expedition team is setting out to search for an ancient temple rumored to bury the tomb of a king from many centuries ago. This monument has long been abandoned and is located in an extremely remote location. After crossing a very far distance, they finally stand in front of this magnificent structure.

The temple has a very unusual architecture, creating a sense of deep mystery. The hidden pathways inside always hold many surprises. Although built mainly with heavy stone blocks instead of steel or concrete like in modern times, the structure still stands strong through time. The archaeological team walks along straight corridors, trying to identify what the statues look like and what shape they have.

They found an ancient source of documents showing the fact that this place was once covered by dark for many decades. Despite facing several strange phenomena and some members almost going missing, they still decided to wait to explore to the very end by walking across the most dangerous areas.`,
    vocabulary: [
      {
        word: 'search',
        phonetic: '/sɜːtʃ/',
        vietnamese: 'tìm kiếm',
        definition: 'Try to find something by looking or otherwise seeking carefully and thoroughly.',
        example: 'The rescue team is continuing to search for the lost hikers in the woods.'
      },
      {
        word: 'ancient',
        phonetic: '/ˈeɪn.ʃənt/',
        vietnamese: 'cổ xưa, cổ đại',
        definition: 'Belonging to the very distant past and no longer in existence or occurrence.',
        example: 'We visited the ruins of an ancient temple built thousands of years ago.'
      },
      {
        word: 'temple',
        phonetic: '/ˈtem.pəl/',
        vietnamese: 'ngôi đền, đền thờ',
        definition: 'A building devoted to the worship, or regarded as the dwelling place, of a god or gods or other objects of religious reverence.',
        example: 'The old Buddhist temple sits quietly on top of the foggy mountain.'
      },
      {
        word: 'bury',
        phonetic: '/ˈber.i/',
        vietnamese: 'chôn cất, chôn vùi',
        definition: 'To put or hide under ground, or cover something completely so that it cannot be seen.',
        example: 'Pirates used to bury their gold treasures on remote desert islands.'
      },
      {
        word: 'tomb',
        phonetic: '/tuːm/',
        vietnamese: 'lăng mộ, ngôi mộ',
        definition: 'A large vault, typically an underground one, for burying the dead.',
        example: 'Archaeologists carefully entered the ancient tomb of the Egyptian pharaoh.'
      },
      {
        word: 'century',
        phonetic: '/ˈsen.tʃər.i/',
        vietnamese: 'thế kỷ',
        definition: 'A period of one hundred years.',
        example: 'The historic church was built in the twelfth century.'
      },
      {
        word: 'abandoned',
        phonetic: '/əˈbæn.dənd/',
        vietnamese: 'bị bỏ hoang, bị từ bỏ',
        definition: 'Having been deserted or left permanently, or no longer used or lived in.',
        example: 'The old abandoned house at the end of the street is said to be haunted.'
      },
      {
        word: 'location',
        phonetic: '/ləʊˈkeɪ.ʃən/',
        vietnamese: 'vị trí, địa điểm',
        definition: 'A particular place or position.',
        example: 'The GPS map showed the exact location of the hidden waterfall.'
      },
      {
        word: 'distance',
        phonetic: '/ˈdɪs.təns/',
        vietnamese: 'khoảng cách',
        definition: 'An amount of space between two things, people, or places.',
        example: 'It is important to maintain a safe driving distance from the car ahead.'
      },
      {
        word: 'far',
        phonetic: '/fɑːr/',
        vietnamese: 'xa, xa xôi',
        definition: 'At, to, or by a great distance in space or time.',
        example: 'How far is it from your house to the nearest train station?'
      },
      {
        word: 'in front of',
        phonetic: '/ɪn frʌnt ɒv/',
        vietnamese: 'ở phía trước',
        definition: 'In a position just ahead of or facing someone or something.',
        example: 'They parked their car right in front of the hotel entrance.'
      },
      {
        word: 'unusual',
        phonetic: '/ʌnˈjuː.ʒu.əl/',
        vietnamese: 'bất thường, khác thường, độc đáo',
        definition: 'Not habitual, common, or ordinary; remarkable or interesting because it is different.',
        example: 'The bird has unusual blue feathers that are very beautiful.'
      },
      {
        word: 'mystery',
        phonetic: '/ˈmɪs.tər.i/',
        vietnamese: 'bí ẩn, điều bí ẩn',
        definition: 'Something that is difficult or impossible to understand or explain.',
        example: 'The sudden disappearance of the ancient civilization remains a mystery.'
      },
      {
        word: 'hidden',
        phonetic: '/ˈhɪd.ən/',
        vietnamese: 'ẩn, giấu kín, bị che khuất',
        definition: 'Kept out of sight or difficult to find; concealed.',
        example: 'They discovered a hidden door behind the large bookshelf.'
      },
      {
        word: 'heavy',
        phonetic: '/ˈhev.i/',
        vietnamese: 'nặng, nặng nề',
        definition: 'Of great weight; difficult to lift or move.',
        example: 'The box is too heavy for me to lift by myself.'
      },
      {
        word: 'steel',
        phonetic: '/stiːl/',
        vietnamese: 'thép',
        definition: 'A hard, strong, gray or bluish-gray alloy of iron with carbon and usually other elements, used extensively as a structural material.',
        example: 'Modern skyscrapers are built using strong steel frames.'
      },
      {
        word: 'concrete',
        phonetic: '/ˈkɒŋ.kriːt/',
        vietnamese: 'bê tông',
        definition: 'A heavy, rough building material made from a mixture of broken stone or gravel, sand, cement, and water.',
        example: 'The builders poured wet concrete to make the foundation of the house.'
      },
      {
        word: 'straight',
        phonetic: '/streɪt/',
        vietnamese: 'thẳng, thẳng tắp',
        definition: 'Extending or moving uniformly in one direction without curving or bending.',
        example: 'Draw a straight line from one corner of the page to the other.'
      },
      {
        word: 'look like',
        phonetic: '/lʊk laɪk/',
        vietnamese: 'trông giống như',
        definition: 'To have a similar appearance to someone or something else.',
        example: 'Those white clouds look like fluffy sheep floating in the sky.'
      },
      {
        word: 'shape',
        phonetic: '/ʃeɪp/',
        vietnamese: 'hình dạng, hình thù',
        definition: 'The external form, contours, or outline of someone or something.',
        example: 'She cut the cookies into the shape of stars and hearts.'
      },
      {
        word: 'source',
        phonetic: '/sɔːs/',
        vietnamese: 'nguồn, nguồn gốc',
        definition: 'A place, person, or thing from which something comes or can be obtained.',
        example: 'The historical documents are a valuable source of information about the past.'
      },
      {
        word: 'fact',
        phonetic: '/fækt/',
        vietnamese: 'sự thật, thực tế',
        definition: 'A thing that is known or proved to be true.',
        example: 'It is a well-known fact that the Earth orbits the Sun.'
      },
      {
        word: 'dark',
        phonetic: '/dɑːk/',
        vietnamese: 'bóng tối, tối tăm',
        definition: 'With little or no light, or the absence of light.',
        example: 'Cats have excellent vision and can see very well in the dark.'
      },
      {
        word: 'decade',
        phonetic: '/ˈdek.eɪd/',
        vietnamese: 'thập kỳ',
        definition: 'A period of ten years.',
        example: 'The technology has changed incredibly over the last decade.'
      },
      {
        word: 'several',
        phonetic: '/ˈsev.ər.əl/',
        vietnamese: 'một vài, vài',
        definition: 'More than two but not many.',
        example: 'I have visited that history museum several times already.'
      },
      {
        word: 'strange',
        phonetic: '/streɪndʒ/',
        vietnamese: 'kỳ lạ, xa lạ',
        definition: 'Unusual or surprising in a way that is unsettling or hard to understand.',
        example: 'She heard a strange noise coming from the attic last night.'
      },
      {
        word: 'missing',
        phonetic: '/ˈmɪs.ɪŋ/',
        vietnamese: 'bị mất, thất lạc, thiếu',
        definition: 'Not present or cannot be found; absent or lost.',
        example: 'The police are still searching for the missing child.'
      },
      {
        word: 'wait',
        phonetic: '/weɪt/',
        vietnamese: 'chờ đợi, đợi',
        definition: 'Stay where one is or delay action until a particular time or event.',
        example: 'We had to wait in a long line to buy the movie tickets.'
      },
      {
        word: 'across',
        phonetic: '/əˈkrɒs/',
        vietnamese: 'băng qua, qua, ngang qua',
        definition: 'From one side to the other of something with clear limits.',
        example: 'They walked carefully across the narrow wooden bridge.'
      }
    ]
  },
  {
    id: 'science-research-brain-power',
    title: 'Science, Research & Brain Power',
    description: 'Khoa học, Nghiên cứu & Trí tuệ - Tìm hiểu cách não bộ xử lý thông tin, kết nối tư duy thực tế và tưởng tượng, giải mã các hiện tượng thần kinh phi thường.',
    category: 'Science',
    vietnameseStory: `Trong phòng thí nghiệm, các nhà khoa học đang nỗ lực để [explain](giải thích) cách bộ não [brain](bộ não) của chúng ta [produce](sản xuất, tạo ra) và xử lý thông tin. Họ muốn biết làm thế nào các tế bào thần kinh có thể [connect](kết nối) và [communicate](giao tiếp) với nhau để đưa ra phản hồi khi [receive](nhận) kích thích từ bên ngoài. Để làm được điều này, họ cần nghiên cứu từng [detail](chi tiết) nhỏ và [find out](tìm hiểu, phát hiện ra) quy luật vận hành của chúng.

Khi một [idea](ý tưởng) mới xuất hiện, người nghiên cứu có thể [come up with](nghĩ ra, nảy ra) những giải pháp đột phá. Họ [believe](tin tưởng) rằng có một mối liên kết mật thiết giữa thế giới thực và những suy nghĩ [imaginary](tưởng tượng, không có thật). Một số thí nghiệm cho thấy hiệu suất làm việc của não bộ có thể tăng [double](gấp đôi) dưới những điều kiện [certain](nhất định).

Tuy nhiên, để biết [exactly](chính xác) [reason](lý do) tại sao điều này xảy ra, họ phải tiến hành các phân tích khoa học tỉ mỉ để tránh bị [fool](đánh lừa) bởi các giả thuyết sai lệch. Khi [realize](nhận ra) sự tồn tại [exist](tồn tại) của những khả năng [extraordinary](phi thường) này, họ vô cùng kinh ngạc. Các thí nghiệm [similar](tương tự) cũng mang lại một [result](kết quả) khả quan, giúp mở ra một [discovery](sự khám phá) mới. Để làm rõ hơn, họ cố gắng [describe](miêu tả) lại quy trình một cách trực quan, đồng thời yêu cầu các tình nguyện viên [guess](đoán) xem hành động tiếp theo là gì.`,
    englishStory: `In the laboratory, scientists are striving to explain how our brain produces and processes information. They want to know how nerve cells can connect and communicate with each other to respond when they receive external stimuli. To do this, they need to study every tiny detail and find out how they operate.

When a new idea emerges, researchers can come up with breakthrough solutions. They believe that there is a close connection between the real world and imaginary thoughts. Some experiments show that brain performance can double under certain conditions.

However, to know exactly the reason why this happens, they must conduct meticulous scientific analyses to avoid being fooled by misleading hypotheses. When they realize the existence of these extraordinary abilities, they are extremely amazed. Similar experiments have also yielded a positive result, helping to open up a new discovery. To make it clearer, they try to describe the process visually, while asking volunteers to guess what the next action is.`,
    vocabulary: [
      {
        word: 'explain',
        phonetic: '/ɪkˈspleɪn/',
        vietnamese: 'giải thích',
        definition: 'To make something clear or easy to understand by describing or giving more information about it.',
        example: 'Could you please explain this difficult math problem to me?'
      },
      {
        word: 'brain',
        phonetic: '/breɪn/',
        vietnamese: 'bộ não',
        definition: 'An organ of soft nervous tissue contained in the skull of vertebrates, functioning as the coordinating center of sensation and intellectual and nervous activity.',
        example: 'Regular mental exercise keeps your brain active and healthy.'
      },
      {
        word: 'produce',
        phonetic: '/prəˈdʒuːs/',
        vietnamese: 'sản xuất, tạo ra',
        definition: 'To make, manufacture, or bring into existence.',
        example: 'The body produces more sweat when you exercise on a hot day.'
      },
      {
        word: 'connect',
        phonetic: '/kəˈnekt/',
        vietnamese: 'kết nối',
        definition: 'To join two or more things together, or to establish a relationship between ideas or people.',
        example: 'You need to connect the printer to your computer before using it.'
      },
      {
        word: 'communicate',
        phonetic: '/kəˈmjuː.nɪ.keɪt/',
        vietnamese: 'giao tiếp',
        definition: 'To share or exchange information, news, or ideas with someone.',
        example: 'We can communicate instantly with people all over the world using emails.'
      },
      {
        word: 'receive',
        phonetic: '/rɪˈsiːv/',
        vietnamese: 'nhận',
        definition: 'To get or accept something that has been given, sent, or offered to you.',
        example: 'I was very happy to receive a beautiful gift from my best friend.'
      },
      {
        word: 'detail',
        phonetic: '/ˈdiː.teɪl/',
        vietnamese: 'chi tiết',
        definition: 'An individual fact, item, or item of information.',
        example: 'She described every detail of her amazing journey to us.'
      },
      {
        word: 'find out',
        phonetic: '/faɪnd aʊt/',
        vietnamese: 'tìm hiểu, phát hiện ra',
        definition: 'To discover a fact or piece of information, or learn something new.',
        example: 'I want to find out the schedule of the next train departure.'
      },
      {
        word: 'idea',
        phonetic: '/aɪˈdɪə/',
        vietnamese: 'ý tưởng',
        definition: 'A thought, plan, suggestion, or opinion about what to do or think.',
        example: 'That is a brilliant idea to improve our team productivity.'
      },
      {
        word: 'come up with',
        phonetic: '/kʌm ʌp wɪð/',
        vietnamese: 'nghĩ ra, nảy ra',
        definition: 'To suggest, produce, or think of an idea, answer, or plan.',
        example: 'She managed to come up with a clever solution to the problem.'
      },
      {
        word: 'believe',
        phonetic: '/bɪˈliːv/',
        vietnamese: 'tin tưởng, tin',
        definition: 'To accept that something is true, real, or correct, or have faith in someone.',
        example: 'I firmly believe that constant practice is the key to success.'
      },
      {
        word: 'imaginary',
        phonetic: '/ɪˈmædʒ.ɪ.nər.i/',
        vietnamese: 'tưởng tượng, không có thật',
        definition: 'Existing only in the imagination; not real.',
        example: 'The child has an imaginary friend who lives in his closet.'
      },
      {
        word: 'double',
        phonetic: '/ˈdʌb.əl/',
        vietnamese: 'gấp đôi, nhân đôi',
        definition: 'Consisting of two equal, identical, or similar parts, or to increase by twofold.',
        example: 'The company plans to double its production capacity next year.'
      },
      {
        word: 'certain',
        phonetic: '/ˈsɜː.tən/',
        vietnamese: 'nhất định',
        definition: 'Known for sure; established beyond doubt, or referring to a specific but unspecified thing.',
        example: 'Under certain weather conditions, we can see beautiful rainbows.'
      },
      {
        word: 'exactly',
        phonetic: '/ɪɡˈzækt.li/',
        vietnamese: 'chính xác',
        definition: 'In a precise or correct manner; accurately or completely.',
        example: 'Tell me exactly what happened during your trip to the temple.'
      },
      {
        word: 'reason',
        phonetic: '/ˈriː.zən/',
        vietnamese: 'lý do, nguyên nhân',
        definition: 'A cause, explanation, or justification for an action or event.',
        example: 'What was the main reason for your decision to study abroad?'
      },
      {
        word: 'fool',
        phonetic: '/fuːl/',
        vietnamese: 'đánh lừa, lừa gạt',
        definition: 'To trick or deceive someone, or make them look foolish.',
        example: 'You cannot fool me with that fake magic trick again.'
      },
      {
        word: 'realize',
        phonetic: '/ˈrɪə.laɪz/',
        vietnamese: 'nhận ra',
        definition: 'To become fully aware of something as a fact; understand clearly.',
        example: 'I suddenly realized that I had left my keys inside the car.'
      },
      {
        word: 'exist',
        phonetic: '/ɪɡˈzɪst/',
        vietnamese: 'tồn tại',
        definition: 'To have objective reality or being, or to live.',
        example: 'Do you believe that life can exist on other planets in space?'
      },
      {
        word: 'extraordinary',
        phonetic: '/ɪkˈsaɪ.tɪd/',
        vietnamese: 'phi thường, lạ thường',
        definition: 'Very unusual or remarkable; outstanding or exceptional.',
        example: 'She has an extraordinary talent for playing the classical piano.'
      },
      {
        word: 'similar',
        phonetic: '/ˈsɪm.ɪ.lər/',
        vietnamese: 'tương tự, giống nhau',
        definition: 'Having a resemblance in appearance, character, or quantity, without being identical.',
        example: 'My sister and I have very similar tastes in books and movies.'
      },
      {
        word: 'result',
        phonetic: '/rɪˈzʌlt/',
        vietnamese: 'kết quả',
        definition: 'A consequence, effect, or outcome of something.',
        example: 'The success of the project was the result of excellent teamwork.'
      },
      {
        word: 'discovery',
        phonetic: '/dɪˈskʌv.ər.i/',
        vietnamese: 'sự khám phá, sự phát hiện',
        definition: 'The act of finding or learning something for the first time.',
        example: 'The scientific discovery of penicillin changed modern medicine forever.'
      },
      {
        word: 'describe',
        phonetic: '/dɪˈskraɪb/',
        vietnamese: 'miêu tả, mô tả',
        definition: 'To give a detailed account in words of someone or something.',
        example: 'Can you describe the physical features of the suspect to the police?'
      },
      {
        word: 'guess',
        phonetic: '/ɡes/',
        vietnamese: 'đoán, phỏng đoán',
        definition: 'To estimate or suppose something without sufficient information to be sure.',
        example: 'Can you guess how many sweets are inside this jar?'
      }
    ]
  },
  {
    id: 'education-public-speaking-goals',
    title: 'Education, Public Speaking & Career Goals',
    description: 'Giáo dục, Thuyết trình & Mục tiêu sự nghiệp - Rèn luyện kỹ năng nói trước đám đông, truyền cảm hứng, vượt qua thất bại và theo đuổi hoài bão sự nghiệp lâu dài.',
    category: 'Education',
    vietnameseStory: `Từ khi còn đi học, Linh luôn chủ động [attend](tham dự) đầy đủ các lớp học và tích cực tìm hiểu mọi [subject](môn học) mà cô [interested in](quan tâm) muốn tìm hiểu sâu hơn. Để rèn luyện kỹ năng mềm, cô quyết định đăng ký [give a speech](phát biểu) trước toàn trường. Linh biết rằng một bài [presentation](bài thuyết trình) thành công không chỉ cần kiến thức mà còn phải biết cách [inspire](truyền cảm hứng) và [encourage](khuyến khích) người nghe. Đây là cơ hội tuyệt vời để cô mài dũa [skill](kỹ năng) giao tiếp – một [characteristic](đặc điểm) quan trọng của người thành công.

Theo lời [advice](lời khuyên) của thầy cô, cô luôn nỗ lực để [achieve](đạt được) những mục tiêu nhỏ trước khi [pursue](theo đuổi) những hoài bão lớn hơn trong sự nghiệp. Cô muốn gia nhập một [organization](tổ chức) uy tín để [earn](kiếm được) cả thu nhập lẫn kinh nghiệm thực tế, từ đó [build](xây dựng) một tương lai vững chắc. Dù đôi khi phải đối mặt với [failure](sự thất bại), Linh vẫn quyết định [accept](chấp nhận) thử thách [challenge](thử thách), bởi cô hiểu rằng điều [matter](quan trọng) nhất là không bao giờ bỏ cuộc.

Cô sẵn sàng [perform](biểu diễn) bài nói của mình trước một [group](nhóm) người bất kỳ để lấy thêm kinh nghiệm. Ban giám khảo chắc chắn sẽ bao gồm những chuyên gia khó tính, nhưng Linh hy vọng [soon](sớm) nhất có thể [possible](có thể), cô sẽ thành công và chứng minh rằng mọi nỗ lực mình bỏ ra đều hoàn toàn [worth](đáng giá). Cô cũng tham gia một câu lạc bộ hùng biện để tiếp tục rèn luyện và [contribute](đóng góp) sức trẻ cho cộng đồng.`,
    englishStory: `Since she was a student, Linh has always actively attended classes and explored subjects she is interested in. To practice soft skills, she decided to register to give a speech in front of the whole school. Linh knows that a successful presentation requires not only knowledge but also knowing how to inspire and encourage the audience. This is a great opportunity for her to sharpen her communication skill – an important characteristic of a successful person.

Following her teachers' advice, she always strives to achieve small goals before pursuing bigger ambitions in her career. She wants to join a reputable organization to earn both income and practical experience, thereby building a solid future. Even though she sometimes faces failure, Linh still decides to accept the challenge, because she understands that the most important thing is to never give up.

She is ready to perform her speech before any group of people to gain more experience. The judges will certainly include tough experts, but Linh hopes that as soon as possible, she will succeed and prove that all her efforts are completely worth it. She also joined a public speaking club to continue practicing and contributing her youth to the community.`,
    vocabulary: [
      {
        word: 'attend',
        phonetic: '/əˈtend/',
        vietnamese: 'tham dự, đi học',
        definition: 'To be present at an event, meeting, or function, or go regularly to an educational institution.',
        example: 'She makes sure to attend all her lectures and seminars regularly.'
      },
      {
        word: 'subject',
        phonetic: '/ˈsʌb.dʒekt/',
        vietnamese: 'môn học, chủ đề',
        definition: 'An area of knowledge that is studied in school, college, or university, or a topic of discussion.',
        example: 'Mathematics has always been my favorite subject in school.'
      },
      {
        word: 'interested in',
        phonetic: '/ˈɪn.trəs.tɪd ɪn/',
        vietnamese: 'quan tâm, thích thú',
        definition: 'Wanting to give your attention to something and discover more about it.',
        example: 'He is highly interested in learning about ancient world history.'
      },
      {
        word: 'give a speech',
        phonetic: '/ɡɪv ə spiːtʃ/',
        vietnamese: 'phát biểu, thuyết trình',
        definition: 'To deliver a formal talk to a group of listeners or an audience.',
        example: 'The valedictorian was chosen to give a speech at the graduation ceremony.'
      },
      {
        word: 'presentation',
        phonetic: '/ˌprez.ənˈteɪ.ʃən/',
        vietnamese: 'bài thuyết trình, trình bày',
        definition: 'A speech or talk in which a new product, idea, or piece of work is shown and explained to an audience.',
        example: 'Her presentation on environmental protection was highly praised.'
      },
      {
        word: 'inspire',
        phonetic: '/ɪnˈspaɪər/',
        vietnamese: 'truyền cảm hứng',
        definition: 'To fill someone with the urge or ability to do or feel something, especially to do something creative or positive.',
        example: 'The teacher\'s speech inspired the students to work harder for their dreams.'
      },
      {
        word: 'encourage',
        phonetic: '/ɪnˈkʌr.ɪdʒ/',
        vietnamese: 'khuyến khích, cổ vũ',
        definition: 'Give support, confidence, or hope to someone to do something.',
        example: 'My parents always encourage me to try new outdoor activities.'
      },
      {
        word: 'skill',
        phonetic: '/skɪl/',
        vietnamese: 'kỹ năng',
        definition: 'The ability to do something well, usually gained through training or experience.',
        example: 'Good communication is an essential skill in almost any career.'
      },
      {
        word: 'characteristic',
        phonetic: '/ˌkær.ək.təˈrɪs.tɪk/',
        vietnamese: 'đặc điểm, đặc tính',
        definition: 'A feature or quality belonging typically to a person, place, or thing and serving to identify it.',
        example: 'Determination is a key characteristic of successful entrepreneurs.'
      },
      {
        word: 'advice',
        phonetic: '/ədˈvaɪs/',
        vietnamese: 'lời khuyên',
        definition: 'Guidance or recommendations offered with regard to prudent future action.',
        example: 'I decided to take my teacher\'s advice and study more vocabulary.'
      },
      {
        word: 'achieve',
        phonetic: '/əˈtʃiːv/',
        vietnamese: 'đạt được',
        definition: 'Successfully bring about or reach a desired objective, level, or result by effort, skill, or courage.',
        example: 'She worked day and night to achieve her academic goals.'
      },
      {
        word: 'pursue',
        phonetic: '/pəˈsjuː/',
        vietnamese: 'theo đuổi',
        definition: 'To follow or try to achieve a desire, plan, or goal over a period of time.',
        example: 'He decided to pursue a professional career in medical science.'
      },
      {
        word: 'organization',
        phonetic: '/ˌɔː.ɡən.aɪˈzeɪ.ʃən/',
        vietnamese: 'tổ chức',
        definition: 'An organized group of people with a particular purpose, such as a business or government department.',
        example: 'She works for a non-profit organization that helps children in need.'
      },
      {
        word: 'earn',
        phonetic: '/ɜːn/',
        vietnamese: 'kiếm được, giành được',
        definition: 'Obtain money or recognition in return for labor, services, or merit.',
        example: 'He wants to get a part-time job to earn some pocket money.'
      },
      {
        word: 'build',
        phonetic: '/bɪld/',
        vietnamese: 'xây dựng',
        definition: 'Construct something by putting parts or materials together, or establish and strengthen over time.',
        example: 'The project aims to build strong relationships among community members.'
      },
      {
        word: 'failure',
        phonetic: '/ˈfeɪ.ljər/',
        vietnamese: 'sự thất bại',
        definition: 'Lack of success, or an unsuccessful action, enterprise, or event.',
        example: 'Do not let a single failure stop you from trying again.'
      },
      {
        word: 'accept',
        phonetic: '/əkˈsept/',
        vietnamese: 'chấp nhận',
        definition: 'Consent to receive a thing offered, or agree to undertake a challenge or responsibility.',
        example: 'She gladly accepted the job offer from the technology company.'
      },
      {
        word: 'challenge',
        phonetic: '/ˈtʃæl.ɪndʒ/',
        vietnamese: 'thử thách, thách thức',
        definition: 'A task or situation that tests someone\'s abilities, or an invitation to compete.',
        example: 'Climbing the high mountain peak was a major physical challenge.'
      },
      {
        word: 'matter',
        phonetic: '/ˈmæt.ər/',
        vietnamese: 'quan trọng, có ý nghĩa',
        definition: 'Be of importance or have significant value or influence.',
        example: 'It doesn\'t matter what other people say, as long as you do your best.'
      },
      {
        word: 'perform',
        phonetic: '/pəˈfɔːm/',
        vietnamese: 'biểu diễn, thực hiện',
        definition: 'Carry out, accomplish, or fulfill an action or present an entertainment to an audience.',
        example: 'The band is scheduled to perform their new song live tonight.'
      },
      {
        word: 'group',
        phonetic: '/ɡruːp/',
        vietnamese: 'nhóm',
        definition: 'A number of people or things that are located close together or are considered or classed together.',
        example: 'A small group of students met in the library to study together.'
      },
      {
        word: 'soon',
        phonetic: '/suːn/',
        vietnamese: 'sớm, chẳng bao lâu nữa',
        definition: 'In or after a short time; before long.',
        example: 'The rainy season will start soon, so make sure to bring an umbrella.'
      },
      {
        word: 'possible',
        phonetic: '/ˈbɒs.ə.bəl/',
        vietnamese: 'có thể, khả thi',
        definition: 'Able to be done, achieved, or to exist under certain conditions.',
        example: 'Is it possible to complete this assignment before tomorrow morning?'
      },
      {
        word: 'worth',
        phonetic: '/wɜːθ/',
        vietnamese: 'đáng giá, xứng đáng',
        definition: 'Having a particular value, or deserving of the effort or attention given.',
        example: 'This beautiful ancient town is definitely worth visiting.'
      },
      {
        word: 'contribute',
        phonetic: '/kənˈtrɪb.juːt/',
        vietnamese: 'đóng góp, góp phần',
        definition: 'Give something, especially money, help, or ideas, to help achieve or provide something.',
        example: 'Many volunteers contribute their time to clean up the local parks.'
      }
    ]
  },
  {
    id: 'urban-life-shopping-economics',
    title: 'Urban Life, Shopping & Economics',
    description: 'Đời sống đô thị, Mua sắm & Kinh tế - Khám phá các xu hướng mua sắm, hành vi tiêu dùng thông minh và sự phát triển của kinh tế đô thị.',
    category: 'Daily Life',
    vietnameseStory: `Tại các thành phố lớn, khi vừa bước qua [entrance](lối vào) để [enter](đi vào) một [store](cửa hàng) hiện đại, khách hàng sẽ lập tức nhìn thấy hàng ngàn [item](mặt hàng) được trưng bày bắt mắt. Sự tiện lợi này đã [force](bắt buộc) các mô hình [market](chợ) truyền thống phải thay đổi để tồn tại. Nhiều người tiêu dùng [decide to](quyết định làm gì) chuyển sang siêu thị vì dịch vụ ở đây ngày càng chuyên nghiệp.

Một người mua sắm [average](trung bình) luôn quan tâm đến các chương trình khuyến mãi [available](có sẵn). Họ tìm kiếm những sản phẩm [low-cost](giá rẻ) để có thể [afford](có đủ khả năng chi trả) và [save](tiết kiệm) tiền bạc cho gia đình. Giữa một [crowd](đám đông) người tấp nập, những mặt hàng giảm giá đến hàng chục [percent](phần trăm) luôn thu hút sự chú ý lớn nhất.

Những [changes](những sự thay đổi) này phản ánh một [trend](xu hướng) tiêu dùng mới đang rất [popular](phổ biến) và [common](thông thường). Khi nền kinh tế tiếp tục [grow](phát triển) và [change](thay đổi), các doanh nghiệp phải không ngừng cải tiến để mang lại sự hài lòng cao nhất cho khách hàng.`,
    englishStory: `In large cities, as soon as they step through the entrance to enter a modern store, customers will immediately see thousands of items attractively displayed. This convenience has forced traditional market models to change in order to survive. Many consumers decide to switch to supermarkets because the service here is increasingly professional.

An average shopper is always interested in available promotional programs. They look for low-cost products so they can afford them and save money for their families. Amid a busy crowd, items discounted by tens of percent always attract the greatest attention.

These changes reflect a new consumer trend that is very popular and common. As the economy continues to grow and change, businesses must constantly improve to bring the highest satisfaction to customers.`,
    vocabulary: [
      {
        word: 'entrance',
        phonetic: '/ˈen.trəns/',
        vietnamese: 'lối vào, cổng vào',
        definition: 'An opening, such as a door, passage, or gate, that allows access to a place.',
        example: 'The grand entrance of the shopping mall was decorated with beautiful flowers.'
      },
      {
        word: 'enter',
        phonetic: '/ˈen.tər/',
        vietnamese: 'đi vào, bước vào',
        definition: 'To come or go into a place.',
        example: 'Please turn off your mobile phone before you enter the cinema.'
      },
      {
        word: 'store',
        phonetic: '/stɔːr/',
        vietnamese: 'cửa hàng',
        definition: 'A retail establishment selling items to the public.',
        example: 'I need to go to the grocery store to buy some fresh milk.'
      },
      {
        word: 'item',
        phonetic: '/ˈaɪ.təm/',
        vietnamese: 'mặt hàng, món đồ',
        definition: 'An individual article or unit, especially one that is part of a list or collection.',
        example: 'Each item in the antique shop has its own unique history.'
      },
      {
        word: 'force',
        phonetic: '/fɔːs/',
        vietnamese: 'bắt buộc, ép buộc',
        definition: 'Make someone do something against their will or make a change necessary.',
        example: 'The heavy rain forced us to cancel our weekend camping trip.'
      },
      {
        word: 'market',
        phonetic: '/ˈmɑː.kɪt/',
        vietnamese: 'chợ, thị trường',
        definition: 'A regular gathering of people for the purchase and sale of provisions, livestock, and other goods.',
        example: 'She loves buying fresh vegetables at the local outdoor market.'
      },
      {
        word: 'decide to',
        phonetic: '/dɪˈsaɪd tuː/',
        vietnamese: 'quyết định làm gì',
        definition: 'To make a choice or come to a resolution about a future action.',
        example: 'They decided to buy a new house closer to the city center.'
      },
      {
        word: 'average',
        phonetic: '/ˈæv.ər.ɪdʒ/',
        vietnamese: 'trung bình',
        definition: 'An amount, standard, or level that is regarded as usual or typical.',
        example: 'An average student spends about three hours studying every night.'
      },
      {
        word: 'available',
        phonetic: '/əˈveɪ.lə.bəl/',
        vietnamese: 'có sẵn, sẵn có',
        definition: 'Able to be used or obtained; at hand.',
        example: 'The free Wi-Fi is available to all customers in the coffee shop.'
      },
      {
        word: 'low-cost',
        phonetic: '/ˌləʊˈkɒst/',
        vietnamese: 'giá rẻ, chi phí thấp',
        definition: 'Relatively inexpensive; cheap.',
        example: 'The airline offers low-cost flights to many popular tourist destinations.'
      },
      {
        word: 'afford',
        phonetic: '/əˈfɔːd/',
        vietnamese: 'có đủ khả năng chi trả',
        definition: 'Have enough money or time to be able to buy or do something.',
        example: 'We cannot afford to buy a new car right now because of our tight budget.'
      },
      {
        word: 'save',
        phonetic: '/seɪv/',
        vietnamese: 'tiết kiệm, cứu',
        definition: 'To keep safe from harm, or to avoid wasting money, time, or energy.',
        example: 'You can save a lot of money by cooking at home instead of eating out.'
      },
      {
        word: 'crowd',
        phonetic: '/kraʊd/',
        vietnamese: 'đám đông',
        definition: 'A large number of people gathered together in a disorganized way.',
        example: 'A huge crowd gathered outside the stadium waiting for the concert to start.'
      },
      {
        word: 'percent',
        phonetic: '/pəˈsent/',
        vietnamese: 'phần trăm',
        definition: 'One part in every hundred; percentage.',
        example: 'Almost eighty percent of the Earth\'s surface is covered with water.'
      },
      {
        word: 'changes',
        phonetic: '/ˈtʃeɪn.dʒɪz/',
        vietnamese: 'những sự thay đổi',
        definition: 'Acts or processes through which something becomes different.',
        example: 'We must adapt to the constant changes in modern society.'
      },
      {
        word: 'trend',
        phonetic: '/trend/',
        vietnamese: 'xu hướng',
        definition: 'A general direction in which something is developing or changing.',
        example: 'There is a growing trend toward working from home among young people.'
      },
      {
        word: 'popular',
        phonetic: '/ˈpɒp.jə.lər/',
        vietnamese: 'phổ biến, được ưa thích',
        definition: 'Liked, admired, or enjoyed by many people or by a particular person or group.',
        example: 'This online game is incredibly popular among teenagers.'
      },
      {
        word: 'common',
        phonetic: '/ˈkɒm.ən/',
        vietnamese: 'thông thường, phổ biến, chung',
        definition: 'Occurring, found, or done often; prevalent or shared.',
        example: 'Flu is a very common winter illness that spreads easily.'
      },
      {
        word: 'grow',
        phonetic: '/ɡrəʊ/',
        vietnamese: 'phát triển, tăng trưởng, lớn lên',
        definition: 'To undergo natural development by increasing in size and changing physically, or to increase.',
        example: 'The startup company continues to grow rapidly in terms of revenue.'
      },
      {
        word: 'change',
        phonetic: '/tʃeɪndʒ/',
        vietnamese: 'thay đổi, sự thay đổi',
        definition: 'Make or become different, or exchange one thing for another.',
        example: 'You can always change your plans if something unexpected happens.'
      }
    ]
  },
  {
    id: 'communication-media-relationships',
    title: 'Communication, Media & Relationships',
    description: 'Giao tiếp, Truyền thông & Các mối quan hệ - Giữ liên lạc, xây dựng các mối quan hệ xã hội bền chặt và thấu hiểu các thông điệp truyền thông trong kỷ nguyên số.',
    category: 'Communication',
    vietnameseStory: `Trong thời đại số, việc [keep in touch](giữ liên lạc) đã trở nên vô cùng dễ dàng. Chúng ta có thể [text](nhắn tin) hoặc [contact](liên lạc) với nhau chỉ trong vài giây. Tuy nhiên, một [conversation](cuộc trò chuyện) trực tiếp vẫn đóng một vai trò quan trọng [play a role in](đóng một vai trò trong) việc giúp con người [interact](tương tác) sâu sắc hơn. Thực tế cho thấy, cách chúng ta phản ứng trước một [image](hình ảnh), một [photograph](bức ảnh) hay một bức tranh [picture](bức tranh) trên mạng xã hội phản ánh rất nhiều về [attitude](thái độ) của chúng ta.

Theo như [according to](theo như) một [article](bài báo) gần đây, những thông điệp số [message](thông điệp) có [influence](ảnh hưởng) rất lớn đến [decision](quyết định) của giới trẻ. Đôi khi, mọi người chỉ [notice](chú ý) phần bề nổi [visual](thuộc về thị giác, trực quan) của vấn đề mà vội vàng đưa ra [response](sự phản hồi), dẫn đến những cuộc tranh cãi [argue](tranh cãi) gay gắt ngay cả trong [break](giờ nghỉ) làm việc.

Để tránh những hiểu lầm không đáng có, chúng ta cần học cách lắng nghe và hiểu rằng mỗi người đều [belong to](thuộc về) những góc nhìn khác nhau. Việc [show](chỉ ra, cho xem) sự thấu hiểu và tôn trọng lẫn nhau sẽ giúp mối quan hệ bền chặt hơn, đồng thời ghi lại [record](ghi lại) những kỷ niệm đẹp trong đời.`,
    englishStory: `In the digital age, keeping in touch has become extremely easy. We can text or contact each other in just a few seconds. However, a face-to-face conversation still plays an important role in helping people interact more deeply. In fact, how we react to an image, a photograph, or a picture on social media reflects a lot about our attitude.

According to a recent article, digital messages have a huge influence on young people's decisions. Sometimes, people only notice the visual surface of an issue and rush to make a response, leading to heated arguments even during a work break.

To avoid unnecessary misunderstandings, we need to learn to listen and understand that everyone belongs to different perspectives. Showing understanding and mutual respect will make relationships stronger, while also recording beautiful memories in life.`,
    vocabulary: [
      {
        word: 'keep in touch',
        phonetic: '/kiːp ɪn tʌtʃ/',
        vietnamese: 'giữ liên lạc',
        definition: 'To maintain communications with someone.',
        example: 'We promised to keep in touch with each other after graduation.'
      },
      {
        word: 'text',
        phonetic: '/tekst/',
        vietnamese: 'nhắn tin',
        definition: 'To send a text message to someone, or written or printed words.',
        example: 'Please text me when you arrive safely at the station.'
      },
      {
        word: 'contact',
        phonetic: '/ˈkɒn.tækt/',
        vietnamese: 'liên lạc, liên hệ',
        definition: 'To communicate with someone, typically by telephone or email.',
        example: 'You can contact our customer support team for assistance.'
      },
      {
        word: 'conversation',
        phonetic: '/ˌkɒn.vəˈseɪ.ʃən/',
        vietnamese: 'cuộc trò chuyện, hội thoại',
        definition: 'A talk, especially an informal one, between two or more people, in which news and ideas are exchanged.',
        example: 'We had a very long and interesting conversation about our favorite hobbies.'
      },
      {
        word: 'play a role in',
        phonetic: '/pleɪ ə rəʊl ɪn/',
        vietnamese: 'đóng một vai trò trong',
        definition: 'To have an effect, influence, or share of responsibility in something.',
        example: 'Regular physical exercise plays a key role in maintaining good health.'
      },
      {
        word: 'interact',
        phonetic: '/ˌɪn.təˈrækt/',
        vietnamese: 'tương tác',
        definition: 'Act in such a way as to have an effect on another; communicate or be involved with.',
        example: 'The children are encouraged to interact and play together in the playground.'
      },
      {
        word: 'image',
        phonetic: '/ˈɪm.ɪdʒ/',
        vietnamese: 'hình ảnh',
        definition: 'A representation of the external form of a person or thing in art, or a mental picture.',
        example: 'She has a clear image of her dream house in her mind.'
      },
      {
        word: 'photograph',
        phonetic: '/ˈfəʊ.tə.ɡrɑːf/',
        vietnamese: 'bức ảnh, tấm ảnh',
        definition: 'A picture made using a camera, in which an image is focused onto film or a light-sensitive material.',
        example: 'He showed us a historic photograph of his grandparents from fifty years ago.'
      },
      {
        word: 'picture',
        phonetic: '/ˈpɪk.tʃər/',
        vietnamese: 'bức tranh, bức ảnh',
        definition: 'A painting, drawing, or photograph on paper or screen.',
        example: 'The child drew a colorful picture of a castle and some tall green trees.'
      },
      {
        word: 'attitude',
        phonetic: '/ˈæt.ɪ.tʃuːd/',
        vietnamese: 'thái độ',
        definition: 'A settled way of thinking or feeling about someone or something, typically one that is reflected in a person\'s behavior.',
        example: 'Having a positive attitude can help you overcome many challenges.'
      },
      {
        word: 'according to',
        phonetic: '/əˈkɔː.dɪŋ tuː/',
        vietnamese: 'theo như, theo',
        definition: 'As stated by or in on the authority of.',
        example: 'According to the weather forecast, it is going to rain this afternoon.'
      },
      {
        word: 'article',
        phonetic: '/ˈɑː.tɪ.kəl/',
        vietnamese: 'bài báo',
        definition: 'A piece of writing included with others in a newspaper, magazine, or other publication.',
        example: 'I read an interesting article about modern artificial intelligence yesterday.'
      },
      {
        word: 'message',
        phonetic: '/ˈmes.ɪdʒ/',
        vietnamese: 'thông điệp, tin nhắn',
        definition: 'A verbal, written, or recorded communication sent to or left for a recipient who cannot be contacted directly.',
        example: 'She left a short message on my phone asking me to call her back.'
      },
      {
        word: 'influence',
        phonetic: '/ˈɪn.flu.əns/',
        vietnamese: 'ảnh hưởng, tác động',
        definition: 'The capacity to have an effect on the character, development, or behavior of someone or something, or the effect itself.',
        example: 'My older sister has a major positive influence on my study habits.'
      },
      {
        word: 'decision',
        phonetic: '/dɪˈsɪʒ.ən/',
        vietnamese: 'quyết định',
        definition: 'A conclusion or resolution reached after consideration.',
        example: 'It took them several days to make a final decision about the project.'
      },
      {
        word: 'notice',
        phonetic: '/ˈnəʊ.tɪs/',
        vietnamese: 'chú ý, nhận thấy',
        definition: 'Become aware of; see, hear, or recognize.',
        example: 'I didn\'t notice any changes in her behavior during the discussion.'
      },
      {
        word: 'visual',
        phonetic: '/ˈvɪʒ.u.əl/',
        vietnamese: 'thuộc về thị giác, trực quan',
        definition: 'Relating to seeing or sight.',
        example: 'Graphic designers use visual elements to communicate messages effectively.'
      },
      {
        word: 'response',
        phonetic: '/rɪˈspɒns/',
        vietnamese: 'sự phản hồi, câu trả lời',
        definition: 'A verbal or written answer, or a reaction to something.',
        example: 'We received a very quick and helpful response from their customer service.'
      },
      {
        word: 'argue',
        phonetic: '/ˈɑːɡ.juː/',
        vietnamese: 'tranh cãi, tranh luận',
        definition: 'Give reasons or cite evidence in support of an idea, action, or theory, typically with the aim of persuading others, or exchange expressing opposite views.',
        example: 'The two friends rarely argue because they respect each other\'s opinions.'
      },
      {
        word: 'break',
        phonetic: '/breɪk/',
        vietnamese: 'giờ nghỉ, giờ giải lao',
        definition: 'An interruption of continuity or a short pause in work or activity.',
        example: 'Let\'s take a short ten-minute break before we continue with our studies.'
      },
      {
        word: 'belong to',
        phonetic: '/bɪˈlɒŋ tuː/',
        vietnamese: 'thuộc về',
        definition: 'Be the property of, or be a member of a group or organization.',
        example: 'This old dictionary belongs to my grandfather.'
      },
      {
        word: 'show',
        phonetic: '/ʃəʊ/',
        vietnamese: 'chỉ ra, cho xem, biểu hiện',
        definition: 'Allow or cause to be visible, or point out or demonstrate.',
        example: 'He showed me how to solve the difficult mathematics puzzle.'
      },
      {
        word: 'record',
        phonetic: '/rɪˈkɔːd/',
        vietnamese: 'ghi lại, kỷ lục',
        definition: 'To set down in writing or some other permanent form for later reference, or an official document.',
        example: 'The teacher records the daily attendance of all students in the class.'
      }
    ]
  },
  {
    id: 'adventure-safety-survival',
    title: 'Adventure, Safety & Survival',
    description: 'Phiêu lưu, An toàn & Sinh tồn - Học cách đối phó với rủi ro, duy trì kiểm soát, phối hợp cùng đồng đội và bảo vệ an toàn khi đối mặt với thử thách sinh tồn.',
    category: 'Adventure',
    vietnameseStory: `Chuyến leo núi mạo hiểm bỗng chốc trở nên cực kỳ [dangerous](nguy hiểm) khi một thành viên trượt chân. Cả nhóm lập tức nhận ra họ đang rơi vào một [situation](tình huống) đầy [danger](sự nguy hiểm) và [risk](rủi ro). Trong tình thế [risky](mạo hiểm) này, việc giữ cho bản thân luôn [in control](trong tầm kiểm soát) là vô cùng quan trọng. Trưởng nhóm nhanh chóng [grab](vồ lấy) một sợi [rope](dây thừng) [strong](khỏe mạnh) để cứu người, bởi vì nếu [without](mà không có) nó, họ không thể vượt qua vách đá dựng đứng.

Họ phải [follow](theo sau) nghiêm ngặt các chỉ dẫn an toàn. Nhìn xuống vực sâu bên dưới, ai nấy đều cảm thấy lo sợ trước [size](kích cỡ) khổng lồ của dãy núi. Đứng [beside](bên cạnh) đồng đội, họ cố gắng [get close](đến gần) để hỗ trợ nhau vượt qua [trouble](rắc rối). Việc nâng cao nhận thức về an toàn buộc họ phải lập tức [take action](hành động) để giải quyết [issue](vấn đề) trước mắt.

May mắn thay [fortunately](may mắn thay), họ đã chuẩn bị [enough](đủ) dụng cụ cứu hộ, dù không may thay [unfortunately](không may thay) nguồn nước uống đang dần [run out (of)](cạn kiệt). Trưởng nhóm yêu cầu mọi người không được [quit](từ bỏ) mà phải [hold](cầm) chặt tay nhau, tập trung toàn bộ [attention](sự chú ý) để di chuyển từng bước một. Trải qua một cú [shock](cú sốc) lớn, họ vẫn tin rằng mình [probably](có lẽ) sẽ an toàn trở về nếu nhận được sự [care](quan tâm) đúng cách từ đồng đội. Họ đã học được cách [deal with](đối phó với) những thử thách khắc nghiệt nhất của thiên nhiên.`,
    englishStory: `The adventurous mountain climbing trip suddenly became extremely dangerous when a member slipped. The whole group immediately realized they were falling into a situation full of danger and risk. In this risky situation, keeping oneself in control was extremely important. The group leader quickly grabbed a strong rope to save the person, because without it, they could not overcome the steep cliff.

They had to follow safety instructions strictly. Looking down at the deep abyss below, everyone felt afraid before the massive size of the mountain range. Standing beside their teammates, they tried to get close to support each other to overcome trouble. Raising safety awareness forced them to immediately take action to resolve the issue at hand.

Fortunately, they had prepared enough rescue equipment, although unfortunately their drinking water source was gradually running out of fuel or supply. The leader asked everyone not to quit but to hold each other's hands tightly, focusing all their attention on moving step by step. Having gone through a big shock, they still believed they would probably return home safely if they received proper care from their teammates. They had learned how to deal with the harshest challenges of nature.`,
    vocabulary: [
      {
        word: 'dangerous',
        phonetic: '/ˈdeɪn.dʒər.əs/',
        vietnamese: 'nguy hiểm',
        definition: 'Able or likely to cause harm or injury.',
        example: 'It is highly dangerous to walk on the highway at night.'
      },
      {
        word: 'situation',
        phonetic: '/ˌsɪtʃ.uˈeɪ.ʃən/',
        vietnamese: 'tình huống, hoàn cảnh',
        definition: 'A set of circumstances in which one finds oneself; a state of affairs.',
        example: 'The police handled the emergency situation with great professionalism.'
      },
      {
        word: 'danger',
        phonetic: '/ˈdeɪn.dʒər/',
        vietnamese: 'sự nguy hiểm, mối hiểm họa',
        definition: 'The possibility of suffering harm or injury.',
        example: 'The warning sign indicates that there is danger ahead.'
      },
      {
        word: 'risk',
        phonetic: '/rɪsk/',
        vietnamese: 'rủi ro, mối đe dọa',
        definition: 'A situation involving exposure to danger.',
        example: 'Investing in new businesses always carries a certain level of financial risk.'
      },
      {
        word: 'risky',
        phonetic: '/ˈrɪs.ki/',
        vietnamese: 'mạo hiểm, đầy rủi ro',
        definition: 'Full of the possibility of danger, failure, or loss.',
        example: 'Skipping breakfast regularly is a risky habit for your health.'
      },
      {
        word: 'in control',
        phonetic: '/ɪn kənˈtrəʊl/',
        vietnamese: 'trong tầm kiểm soát, tự chủ',
        definition: 'Having the power to direct or manage something, or maintaining self-possession.',
        example: 'A good driver always stays calm and in control of the vehicle.'
      },
      {
        word: 'grab',
        phonetic: '/ɡræb/',
        vietnamese: 'vồ lấy, chộp lấy, giật lấy',
        definition: 'To take hold of something or someone suddenly and roughly.',
        example: 'He had to grab the handrail to keep from falling down the stairs.'
      },
      {
        word: 'rope',
        phonetic: '/rəʊp/',
        vietnamese: 'dây thừng, dây cáp',
        definition: 'A length of thick strong cord made by twisting together strands of hemp, nylon, or other material.',
        example: 'They tied the boat to the wooden dock with a thick rope.'
      },
      {
        word: 'strong',
        phonetic: '/strɒŋ/',
        vietnamese: 'mạnh mẽ, khỏe mạnh',
        definition: 'Having the power to move heavy weights or perform other physically demanding tasks.',
        example: 'The strong wind blew down several old trees in the park.'
      },
      {
        word: 'without',
        phonetic: '/wɪˈðaʊt/',
        vietnamese: 'mà không có, thiếu',
        definition: 'In the absence of; not having the use or companionship of.',
        example: 'We cannot survive for more than a few days without fresh water.'
      },
      {
        word: 'follow',
        phonetic: '/ˈfɒl.əʊ/',
        vietnamese: 'theo sau, tuân theo, đi theo',
        definition: 'Go or come after a person or thing proceeding ahead, or act according to an instruction or rule.',
        example: 'Please follow the painted arrow signs to find the main exit.'
      },
      {
        word: 'size',
        phonetic: '/saɪz/',
        vietnamese: 'kích cỡ, kích thước',
        definition: 'The relative extent of something; a thing\'s overall dimensions or magnitude.',
        example: 'The shirt is available in several different sizes to fit everyone.'
      },
      {
        word: 'beside',
        phonetic: '/bɪˈsaɪd/',
        vietnamese: 'bên cạnh, sát bên',
        definition: 'At the side of; next to.',
        example: 'She sat quietly beside her friend during the long train journey.'
      },
      {
        word: 'get close',
        phonetic: '/ɡet kləʊs/',
        vietnamese: 'đến gần, tiếp cận',
        definition: 'To move near to someone or something.',
        example: 'Don\'t get close to the edge of the high cliff as it is very dangerous.'
      },
      {
        word: 'trouble',
        phonetic: '/ˈtrʌb.əl/',
        vietnamese: 'rắc rối, khó khăn',
        definition: 'Difficulty or problems, or a state of distress or worry.',
        example: 'She had some trouble starting the old car engine this morning.'
      },
      {
        word: 'take action',
        phonetic: '/teɪk ˈæk.ʃən/',
        vietnamese: 'hành động, thực hiện hành động',
        definition: 'Do something to deal with a situation or solve a problem.',
        example: 'We need to take action immediately to protect the endangered animals.'
      },
      {
        word: 'issue',
        phonetic: '/ˈɪʃ.uː/',
        vietnamese: 'vấn đề, sự cố',
        definition: 'An important topic or problem for debate or discussion, or a technical fault.',
        example: 'The engineers are working hard to resolve the system security issue.'
      },
      {
        word: 'fortunately',
        phonetic: '/ˈfɔː.tʃən.ət.li/',
        vietnamese: 'may mắn thay',
        definition: 'It is fortunate that; used to say that something good or lucky has happened.',
        example: 'Fortunately, the heavy rain stopped just before our outdoor wedding ceremony started.'
      },
      {
        word: 'unfortunately',
        phonetic: '/unˈfɔː.tʃən.ət.li/',
        vietnamese: 'không may thay',
        definition: 'It is unfortunate that; used to say that something bad or unlucky has happened.',
        example: 'Unfortunately, all the flight tickets to London were completely sold out.'
      },
      {
        word: 'enough',
        phonetic: '/ɪˈnʌf/',
        vietnamese: 'đủ',
        definition: 'As much or as many as required; auxiliary or adequate.',
        example: 'There are not enough chairs in the classroom for all the students.'
      },
      {
        word: 'run out (of)',
        phonetic: '/rʌn aʊt ɒv/',
        vietnamese: 'cạn kiệt, hết sạch',
        definition: 'To use up or exhaust the supply of something so that none is left.',
        example: 'We had to stop at the petrol station because the car was about to run out of fuel.'
      },
      {
        word: 'quit',
        phonetic: '/kwɪt/',
        vietnamese: 'từ bỏ, bỏ cuộc, nghỉ',
        definition: 'To stop doing something, or leave a job or school.',
        example: 'He decided to quit his job in order to travel around the world.'
      },
      {
        word: 'hold',
        phonetic: '/həʊld/',
        vietnamese: 'cầm, nắm, giữ',
        definition: 'Grasp, carry, or support with one\'s arms or hands.',
        example: 'Please hold the baby carefully while I open the front door.'
      },
      {
        word: 'attention',
        phonetic: '/əˈten.ʃən/',
        vietnamese: 'sự chú ý',
        definition: 'Notice taken of someone or something; the regarding of someone or something as interesting or important.',
        example: 'You should pay close attention to the teacher\'s instructions during the science lab.'
      },
      {
        word: 'shock',
        phonetic: '/ʃɒk/',
        vietnamese: 'cú sốc, sự chấn động',
        definition: 'A sudden upsetting or surprising event or experience, or a violent shake.',
        example: 'The sudden news of his retirement came as a major shock to the company.'
      },
      {
        word: 'probably',
        phonetic: '/ˈprɒb.ə.bli/',
        vietnamese: 'có lẽ, hầu như chắc chắn',
        definition: 'Almost certainly; as is far as can be expected.',
        example: 'If we leave now, we will probably arrive at the airport on time.'
      },
      {
        word: 'care',
        phonetic: '/keər/',
        vietnamese: 'quan tâm, chăm sóc, sự bảo dưỡng',
        definition: 'The provision of what is necessary for the health, welfare, maintenance, and protection of someone or something.',
        example: 'The newborn puppies need constant care and warmth from their mother.'
      },
      {
        word: 'deal with',
        phonetic: '/diːl wɪð/',
        vietnamese: 'đối phó với, giải quyết',
        definition: 'To take action on, handle, or solve a problem or task.',
        example: 'The school counselor helps students deal with stress and exam anxiety.'
      }
    ]
  },
  {
    id: 'environmental-action-biodiversity',
    title: 'Environmental Action & Biodiversity',
    description: 'Hành động vì Môi trường & Đa dạng sinh học - Bảo vệ các loài có nguy cơ tuyệt chủng, giảm thiểu rác thải nhựa, ứng phó biến đổi khí hậu và bảo tồn đa dạng sinh học.',
    category: 'Environment',
    vietnameseStory: `Để bảo vệ các [species](loài) động vật đang [in danger](gặp nguy hiểm), cộng đồng cần phải [take care of](chăm sóc) môi trường sống của chúng và ngừng các hoạt động làm [hurt](làm tổn thương) đến thiên nhiên. Việc con người liên tục [throw out](vứt đi) rác thải nhựa mà không tiến hành [recycle](tái chế) đang gây ra những [damage](gây hại) nghiêm trọng cho hệ sinh thái. Các nhà bảo tồn đã lập ra một dự án đặc biệt với [purpose](mục đích) phục hồi nguồn nước và đất đai.

Họ nhận thấy sự [rise/fall](tăng/giảm) thất thường của nhiệt độ, lúc thì [cool/warm](mát mẻ/ấm áp) quá mức, lúc thì vượt [over/under](trên/dưới) mức trung bình, đang đe dọa đến [condition](điều kiện) sống của các loài sinh vật. Để bảo đảm [well-being](trạng thái khỏe mạnh) cho muôn loài, chúng ta phải kiểm soát sự [increase/decrease](tăng/giảm) của lượng khí thải độc hại và đặt ra một [limit](giới hạn) nghiêm ngặt cho việc khai thác tài nguyên bừa bãi.

Nhiều loài thực vật [rare](hiếm) cần được [attach to](gắn vào) các thiết bị theo dõi để bảo vệ chúng khỏi nạn khai thác trái phép. Những nỗ lực này cần phải được [spread](lan rộng) để nâng cao nhận thức cộng đồng và [allow](cho phép) các thế hệ tương lai vẫn có thể [catch](bắt gặp) hình ảnh những khu rừng xanh mướt. Đây không chỉ là nhiệm vụ sinh thái mà còn mang giá trị [cultural](thuộc về văn hóa) sâu sắc cần được thực hiện [within](trong phạm vi) khả năng của mỗi quốc gia.`,
    englishStory: `To protect animal species in danger, the community needs to take care of their habitat and stop activities that hurt nature. Humans constantly throwing out plastic waste without conducting recycling is causing severe damage to the ecosystem. Conservationists have established a special project with the purpose of restoring water and soil sources.

They noticed the erratic rise/fall of temperature, sometimes excessively cool/warm, sometimes going over/under the average level, which is threatening the living conditions of organisms. To ensure the well-being of all species, we must control the increase/decrease of toxic emissions and set a strict limit on indiscriminate resource extraction.

Many rare plant species need to be attached to tracking devices to protect them from illegal exploitation. These efforts must be spread to raise public awareness and allow future generations to still catch the image of lush green forests. This is not only an ecological task but also carries a deep cultural value that needs to be carried out within the capability of each nation.`,
    vocabulary: [
      {
        word: 'species',
        phonetic: '/ˈspiː.ʃiːz/',
        vietnamese: 'loài, chủng loài',
        definition: 'A group of living organisms consisting of similar individuals capable of exchanging genes or interbreeding.',
        example: 'There are many endangered species of plants and animals in the rainforest.'
      },
      {
        word: 'in danger',
        phonetic: '/ɪn ˈdeɪn.dʒər/',
        vietnamese: 'gặp nguy hiểm, lâm nguy',
        definition: 'In a situation in which something unpleasant or harmful is likely to happen.',
        example: 'The rare birds are in danger of becoming extinct.'
      },
      {
        word: 'take care of',
        phonetic: '/teɪk keər ɒv/',
        vietnamese: 'chăm sóc, bảo vệ',
        definition: 'To look after or provide for the needs of someone or something.',
        example: 'We must take care of our planet by reducing waste.'
      },
      {
        word: 'hurt',
        phonetic: '/hɜːt/',
        vietnamese: 'làm tổn thương, gây hại',
        definition: 'To cause physical pain or injury, or to harm someone\'s feelings or damage something.',
        example: 'Pollution can seriously hurt the local wildlife.'
      },
      {
        word: 'throw out',
        phonetic: '/θrəʊ aʊt/',
        vietnamese: 'vứt đi, thải ra',
        definition: 'To get rid of something that you do not want any more; discard.',
        example: 'Do not throw out plastic bottles; instead, collect them for recycling.'
      },
      {
        word: 'recycle',
        phonetic: '/ˌriːˈsaɪ.kəl/',
        vietnamese: 'tái chế',
        definition: 'Convert waste into reusable material.',
        example: 'Many households now recycle paper, glass, and metal cans regularly.'
      },
      {
        word: 'damage',
        phonetic: '/ˈdæm.ɪdʒ/',
        vietnamese: 'gây hại, thiệt hại',
        definition: 'Physical harm caused to something which makes it less attractive, useful, or valuable.',
        example: 'The oil spill caused severe damage to the coastal ecosystem.'
      },
      {
        word: 'purpose',
        phonetic: '/ˈpɜː.pəs/',
        vietnamese: 'mục đích',
        definition: 'The reason for which something is done or created or for which something exists.',
        example: 'The main purpose of the conservation area is to protect rare animals.'
      },
      {
        word: 'rise/fall',
        phonetic: '/raɪz fɔːl/',
        vietnamese: 'tăng/giảm, lên/xuống',
        definition: 'The movement of going up or down, or increasing and decreasing.',
        example: 'The constant rise/fall of global temperatures indicates climate instability.'
      },
      {
        word: 'cool/warm',
        phonetic: '/kuːl wɔːm/',
        vietnamese: 'mát mẻ/ấm áp',
        definition: 'Relatively cold or hot weather, or temperatures that are refreshing or warm.',
        example: 'The weather transitions between cool/warm periods depending on the season.'
      },
      {
        word: 'over/under',
        phonetic: '/ˈəʊ.vər ˈʌn.dər/',
        vietnamese: 'trên/dưới',
        definition: 'Above or below a particular level, limit, or average.',
        example: 'Temperatures fluctuate over/under the standard average for this month.'
      },
      {
        word: 'condition',
        phonetic: '/kənˈdɪʃ.ən/',
        vietnamese: 'điều kiện, trạng thái',
        definition: 'The state of something with regard to its appearance, quality, or working order.',
        example: 'The living conditions of the local species have deteriorated due to deforestation.'
      },
      {
        word: 'well-being',
        phonetic: '/ˌwelˈbiː.ɪŋ/',
        vietnamese: 'trạng thái khỏe mạnh, hạnh phúc',
        definition: 'The state of being comfortable, healthy, or happy.',
        example: 'Green spaces in cities are essential for the well-being of the citizens.'
      },
      {
        word: 'increase/decrease',
        phonetic: '/ɪnˈkriːs dɪˈkriːs/',
        vietnamese: 'tăng/giảm',
        definition: 'To make or become larger or smaller in amount, size, or degree.',
        example: 'We need to manage the increase/decrease of greenhouse gas emissions carefully.'
      },
      {
        word: 'limit',
        phonetic: '/ˈlɪm.ɪt/',
        vietnamese: 'giới hạn',
        definition: 'A point or level beyond which something does not or may not extend or pass.',
        example: 'The government set a strict limit on the volume of timber that can be harvested.'
      },
      {
        word: 'rare',
        phonetic: '/reər/',
        vietnamese: 'hiếm, quý hiếm',
        definition: 'Not occurring very often, or exceptionally valuable or uncommon.',
        example: 'They discovered a rare orchid species blooming deep in the valley.'
      },
      {
        word: 'attach to',
        phonetic: '/əˈtætʃ tuː/',
        vietnamese: 'gắn vào, gắn kết',
        definition: 'To join, fasten, or connect one thing to another.',
        example: 'Scientists attach tracking devices to the sea turtles to study their migration.'
      },
      {
        word: 'spread',
        phonetic: '/spred/',
        vietnamese: 'lan rộng, truyền bá',
        definition: 'Extend over a large or increasing area, or distribute or disperse something.',
        example: 'We should use social media to spread awareness about forest protection.'
      },
      {
        word: 'allow',
        phonetic: '/əˈlaʊ/',
        vietnamese: 'cho phép',
        definition: 'Give necessary time or opportunity for, or permit someone to do something.',
        example: 'We should protect these lands to allow nature to recover.'
      },
      {
        word: 'catch',
        phonetic: '/kætʃ/',
        vietnamese: 'bắt lấy, bắt gặp',
        definition: 'Intercept and hold, or unexpected meet, see, or find.',
        example: 'If you are lucky, you might catch a glimpse of the rare leopard in this area.'
      },
      {
        word: 'cultural',
        phonetic: '/ˈkʌl.tʃər.əl/',
        vietnamese: 'thuộc về văn hóa',
        definition: 'Relating to the ideas, customs, and social behavior of a society.',
        example: 'Protecting the sacred forest is of great cultural importance to the local community.'
      },
      {
        word: 'within',
        phonetic: '/wɪˈðɪn/',
        vietnamese: 'trong phạm vi, trong vòng',
        definition: 'Inside the range of a particular limit, area, or boundary.',
        example: 'We must work within our resources to implement the conservation program.'
      }
    ]
  }
];
