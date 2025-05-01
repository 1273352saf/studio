
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
  category?: 'local' | 'sohag' | 'egypt' | 'governorate' | 'world' | 'general'; // Added category, including 'sohag', 'egypt'
}

/**
 * Asynchronously retrieves news articles based on keywords and category.
 *
 * @param keywords The keywords to search for in news articles.
 * @param category Optional category to filter news articles. Allowed values: 'local', 'governorate' (used for sohag/egypt), 'world'.
 * @returns A promise that resolves to an array of NewsArticle objects.
 */
export async function getNewsArticles(
  keywords: string,
  category?: 'local' | 'governorate' | 'world' // API accepts 'local', 'governorate', 'world'
): Promise<NewsArticle[]> {
  console.log(`API Call Simulation: Searching for "${keywords}" in category "${category || 'all'}"`);

  // TODO: Implement this by calling a real API, passing keywords and category.

  const providedImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/6/60/JaVale_McGee_Joakim_Noah_2011.jpg';
  const soccerImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm1hQ5ZqXfXfXfXfXfXfXfXfXfXfXfXfXfXfXfXfXfXfXfXfXfXQ&usqp=CAU';

  // Mock data including potential 'sohag' and 'egypt' categories for display mapping later
  const allArticles: NewsArticle[] = [
    {
      title: 'خبر محلي: افتتاح حديقة جديدة في المدينة',
      summary: 'تم افتتاح حديقة عامة جديدة اليوم بحضور عدد من المسؤولين، وتضم الحديقة مساحات خضراء ومرافق ترفيهية.',
      source: 'جريدة المدينة',
      url: 'https://example.com/local1',
      imageUrl: 'https://picsum.photos/600/400?random=1',
      category: 'local' // Corresponds to 'local' API category
    },
    {
      title: 'عالمي: اتفاق تجاري جديد بين دولتين',
      summary: 'تم توقيع اتفاقية تجارية هامة بين دولتين تهدف إلى تعزيز التبادل التجاري والاقتصادي بينهما.',
      source: 'شبكة الأخبار العالمية',
      url: 'https://example.com/world1',
      imageUrl: 'https://picsum.photos/600/400?random=2',
      category: 'world' // Corresponds to 'world' API category
    },
    {
      title: 'محافظة سوهاج: تطوير البنية التحتية',
      summary: 'أعلنت السلطات المحلية عن خطة شاملة لتطوير الطرق والمرافق الخدمية في محافظة سوهاج خلال العام القادم.',
      source: 'أخبار المحافظات',
      url: 'https://example.com/sohag1',
      imageUrl: soccerImageUrl,
      category: 'sohag' // Will map to 'governorate' API category
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
      title: 'أخبار مصر: مشروع قومي جديد للطرق',
      summary: 'الحكومة تعلن عن بدء تنفيذ مشروع قومي ضخم لتوسعة شبكة الطرق الرئيسية في مصر.',
      source: 'وكالة أنباء مصر',
      url: 'https://example.com/egypt1',
      imageUrl: 'https://picsum.photos/600/400?random=4',
      category: 'egypt' // Will map to 'governorate' API category
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
      category: 'governorate' // Corresponds to 'governorate' API category
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
    },
    {
      title: 'أخبار مصر: زيادة الاستثمارات في قطاع السياحة',
      summary: 'تشهد مصر زيادة ملحوظة في الاستثمارات السياحية مع توقعات بموسم سياحي قوي.',
      source: 'جريدة الاقتصاد المصري',
      url: 'https://example.com/egypt2',
      imageUrl: 'https://picsum.photos/600/400?random=9',
      category: 'egypt' // Will map to 'governorate' API category
    },
     {
      title: 'محافظة سوهاج: مبادرة لدعم المشاريع الصغيرة',
      summary: 'أطلقت محافظة سوهاج مبادرة جديدة لدعم رواد الأعمال وأصحاب المشاريع الصغيرة والمتوسطة.',
      source: 'صوت سوهاج',
      url: 'https://example.com/sohag2',
      imageUrl: 'https://picsum.photos/600/400?random=10',
      category: 'sohag' // Will map to 'governorate' API category
    },

  ];

  // Simulate filtering based on API category and keywords
  let filteredArticles = allArticles;

  if (category) {
    // Filter based on the API category ('local', 'governorate', 'world')
    filteredArticles = filteredArticles.filter(article => {
        if (category === 'governorate') {
            // If API category is 'governorate', include articles marked as 'sohag', 'egypt', or 'governorate'
            return article.category === 'sohag' || article.category === 'egypt' || article.category === 'governorate';
        }
        // Otherwise, match the exact category ('local' or 'world')
        return article.category === category;
    });
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
