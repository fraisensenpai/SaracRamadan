export interface IslamicContent {
  text: string;
  source: string;
}

export const ayetler: IslamicContent[] = [
  { text: "Ramazan ayı, insanlara yol gösterici, doğrunun ve doğruyu eğriden ayırmanın açık delilleri olarak Kur'an'ın indirildiği aydır.", source: "Bakara, 185" },
  { text: "Ey iman edenler! Oruç, sizden öncekilere farz kılındığı gibi, size de farz kılındı. Umulur ki korunursunuz.", source: "Bakara, 183" },
  { text: "Şüphesiz Allah, sabredenlerle beraberdir.", source: "Bakara, 153" },
  { text: "Kim bir iyilik yaparsa, ona on katı verilir.", source: "En'am, 160" },
  { text: "Allah, göklerin ve yerin nurudur.", source: "Nur, 35" },
  { text: "Rabbinize yalvararak ve gizlice dua edin.", source: "A'raf, 55" },
  { text: "De ki: Rabbim, ilmimi artır.", source: "Taha, 114" },
  { text: "Namazı dosdoğru kılın, zekâtı verin ve rükû edenlerle birlikte rükû edin.", source: "Bakara, 43" },
  { text: "Biz, Kur'an'dan müminler için şifa ve rahmet olan şeyleri indiriyoruz.", source: "İsra, 82" },
  { text: "Allah, her güçlüğün ardından bir kolaylık yaratır.", source: "Talak, 7" },
  { text: "Muhakkak ki zorlukla beraber kolaylık vardır.", source: "İnşirah, 5" },
  { text: "Rabbinizden bağışlanma dileyin. Çünkü O, çok bağışlayandır.", source: "Nuh, 10" },
  { text: "Kim Allah'a tevekkül ederse, Allah ona yeter.", source: "Talak, 3" },
  { text: "Allah'ı çokça zikredin ki kurtuluşa eresiniz.", source: "Cuma, 10" },
  { text: "Sabır ve namazla yardım isteyin. Şüphesiz bu, Allah'a saygı gösterenlerden başkasına ağır gelir.", source: "Bakara, 45" },
];

export const hadisler: IslamicContent[] = [
  { text: "Oruç bir kalkandır. Oruçlu kimse kötü söz söylemesin ve kavga etmesin.", source: "Buhari" },
  { text: "Kim inanarak ve sevabını Allah'tan umarak Ramazan orucunu tutarsa, geçmiş günahları bağışlanır.", source: "Buhari, Müslim" },
  { text: "Ramazan geldiğinde cennet kapıları açılır, cehennem kapıları kapanır ve şeytanlar zincire vurulur.", source: "Buhari, Müslim" },
  { text: "Sahura kalkın! Çünkü sahurda bereket vardır.", source: "Buhari, Müslim" },
  { text: "İnsanların en hayırlısı, insanlara en faydalı olanıdır.", source: "Taberani" },
  { text: "Güzel söz sadakadır.", source: "Buhari, Müslim" },
  { text: "Kolaylaştırınız, zorlaştırmayınız. Müjdeleyiniz, nefret ettirmeyiniz.", source: "Buhari" },
  { text: "Ameller niyetlere göredir.", source: "Buhari, Müslim" },
  { text: "Oruçlunun iftarını açtığı vakit reddolunmayan bir duası vardır.", source: "İbn Mace" },
  { text: "Bir hurma ile bile olsa oruçluyu iftar ettirin.", source: "Tirmizi" },
  { text: "Mümin, insanlarla iyi geçinen ve kendisiyle iyi geçinilen kimsedir.", source: "Ahmed" },
  { text: "Kul, kardeşinin yardımında olduğu sürece, Allah da kulun yardımındadır.", source: "Müslim" },
  { text: "Güleryüzle karşılaşman bile olsa, hiçbir iyiliği küçük görme.", source: "Müslim" },
  { text: "En hayırlı amel, az da olsa devamlı olanıdır.", source: "Buhari, Müslim" },
  { text: "Tefekkür ibadetin yarısıdır.", source: "Beyhaki" },
];

export const dualar: IslamicContent[] = [
  { text: "Allahım! Senden hidayet, takva, iffet ve gönül zenginliği isterim.", source: "Müslim" },
  { text: "Rabbimiz! Bize dünyada da, ahirette de iyilik ver ve bizi ateş azabından koru.", source: "Bakara, 201" },
  { text: "Allah'ım! Kalbimi nurlandır, gözümü nurlandır, kulağımı nurlandır.", source: "Buhari" },
  { text: "Rabbim! Beni ve soyumdan gelecekleri namazı dosdoğru kılanlardan eyle.", source: "İbrahim, 40" },
  { text: "Allahım! Sen affedicisin, affetmeyi seversin, beni de affet.", source: "Tirmizi" },
  { text: "Allah'ım! Acizlikten, tembellikten, korkaklıktan ve cimrilikten sana sığınırım.", source: "Buhari" },
  { text: "Rabbim! Göğsümü aç, işimi kolaylaştır.", source: "Taha, 25-26" },
  { text: "Hasbünallahu ve ni'mel vekil — Allah bize yeter, O ne güzel vekildir.", source: "Al-i İmran, 173" },
  { text: "Ya Rabbi! İlmimi, rızkımı ve amelimi artır.", source: "Tirmizi" },
  { text: "Allahım! Faydasız ilimden, korkmayan kalpten, doymayan nefisten ve kabul olunmayan duadan sana sığınırım.", source: "Müslim" },
];

export function getDailyContent(contents: IslamicContent[], seed?: number): IslamicContent {
  const today = seed ?? Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return contents[today % contents.length];
}

export function getRandomContent(contents: IslamicContent[]): IslamicContent {
  return contents[Math.floor(Math.random() * contents.length)];
}
