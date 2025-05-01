
/**
 * Represents a news article with title, summary and source information.
 */
export interface NewsArticle {
  /**
   * The title of the news article.
   */
  title: string;
  /**
   * A brief summary of the news article.
   */
  summary: string;
  /**
   * The source of the news article.
   */
  source: string;
  /**
   * The URL of the full article.
   */
  url: string;
  /**
   * Optional URL for an associated image.
   */
  imageUrl?: string; // Added optional imageUrl
  /**
   * Category of the news article.
   */
  category?: 'local' | 'governorate' | 'world' | 'general'; // Added category
}

/**
 * Asynchronously retrieves news articles based on keywords and category.
 *
 * @param keywords The keywords to search for in news articles.
 * @param category Optional category to filter news articles.
 * @returns A promise that resolves to an array of NewsArticle objects.
 */
export async function getNewsArticles(
  keywords: string,
  category?: 'local' | 'governorate' | 'world'
): Promise<NewsArticle[]> {
  console.log(`API Call Simulation: Searching for "${keywords}" in category "${category || 'all'}"`);

  // TODO: Implement this by calling a real API, passing keywords and category.

  const providedImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/6/60/JaVale_McGee_Joakim_Noah_2011.jpg';
  const soccerImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm1hQ5ZqXfXfXfXfXfXfXfXfXfXfXfXfXfXfXfXfXfXfXfXfXfXQ&usqp=CAU';

  const allArticles: NewsArticle[] = [
    {
      title: 'خبر محلي: افتتاح حديقة جديدة في المدينة',
      summary: 'تم افتتاح حديقة عامة جديدة اليوم بحضور عدد من المسؤولين، وتضم الحديقة مساحات خضراء ومرافق ترفيهية.',
      source: 'جريدة المدينة',
      url: 'https://example.com/local1',
      imageUrl: 'https://picsum.photos/600/400?random=1',
      category: 'local'
    },
    {
      title: 'عالمي: اتفاق تجاري جديد بين دولتين',
      summary: 'تم توقيع اتفاقية تجارية هامة بين دولتين تهدف إلى تعزيز التبادل التجاري والاقتصادي بينهما.',
      source: 'شبكة الأخبار العالمية',
      url: 'https://example.com/world1',
      imageUrl: 'https://picsum.photos/600/400?random=2',
      category: 'world'
    },
    {
      title: 'محافظات: تطوير البنية التحتية في محافظة XYZ',
      summary: 'أعلنت السلطات المحلية عن خطة شاملة لتطوير الطرق والمرافق الخدمية في محافظة XYZ خلال العام القادم.',
      source: 'أخبار المحافظات',
      url: 'https://example.com/gov1',
      imageUrl: soccerImageUrl,
      category: 'governorate'
    },
     {
      title: 'محلي: شركة تقنية محلية تعلن عن ابتكار جديد',
      summary: 'شركة تكنولوجيا محلية تكشف عن ابتكار ثوري قد يغير صناعة الاتصالات.',
      source: 'أخبار التكنولوجيا المحلية',
      url: 'https://example.com/local2',
      imageUrl: providedImageUrl,
      category: 'local'
    },
     {
      title: 'عالمي: مؤتمر المناخ يختتم أعماله باتفاق تاريخي',
      summary: 'اختتم مؤتمر المناخ العالمي أعماله باتفاق يهدف إلى خفض الانبعاثات الكربونية بشكل كبير.',
      source: 'وكالة الأنباء الدولية',
      url: 'https://example.com/world2',
       imageUrl: 'https://picsum.photos/600/400?random=5',
       category: 'world'
    },
    {
      title: 'محافظات: افتتاح مستشفى جديد في محافظة ABC',
      summary: 'تم افتتاح مستشفى حديث في محافظة ABC مزود بأحدث التقنيات الطبية لخدمة أهالي المنطقة.',
      source: 'صوت المحافظات',
      url: 'https://example.com/gov2',
      imageUrl: 'https://picsum.photos/600/400?random=6',
      category: 'governorate'
    },
    {
      title: 'محلي: فعالية ثقافية تجذب الجمهور في وسط المدينة',
      summary: 'نُظمت فعالية ثقافية متنوعة في ساحة وسط المدينة شهدت إقبالاً كبيراً من الجمهور.',
      source: 'أصداء المدينة',
      url: 'https://example.com/local3',
      imageUrl: 'https://picsum.photos/600/400?random=7',
      category: 'local'
    },
    {
        title: 'عالمي: اكتشاف أثري جديد يغير فهم التاريخ',
        summary: 'فريق من علماء الآثار يعلن عن اكتشاف موقع أثري قد يعيد كتابة جزء من تاريخ الحضارات القديمة.',
        source: 'مجلة العلوم والتاريخ',
        url: 'https://example.com/world3',
        imageUrl: 'https://picsum.photos/600/400?random=8',
        category: 'world'
    }
  ];

  // Simulate filtering based on category and keywords
  let filteredArticles = allArticles;

  if (category) {
    filteredArticles = filteredArticles.filter(article => article.category === category);
  }

  if (keywords) {
    const lowerKeywords = keywords.toLowerCase();
    filteredArticles = filteredArticles.filter(article =>
      article.title.toLowerCase().includes(lowerKeywords) ||
      article.summary.toLowerCase().includes(lowerKeywords) ||
      article.source.toLowerCase().includes(lowerKeywords)
    );
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  return filteredArticles;
}
