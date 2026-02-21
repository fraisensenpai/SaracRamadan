import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Moon, Clock, MapPin } from "lucide-react";
import ramadanBg from "@/assets/ramadan-bg.jpg";
import CountdownTimer from "@/components/CountdownTimer";
import ContentCard from "@/components/ContentCard";
import RandomContentButton from "@/components/RandomContentButton";
import { ayetler, hadisler, dualar, getDailyContent } from "@/data/islamicContent";
import { getIftarFromAladhan } from "@/lib/prayerApi";

// 2026 Ramazan: 17 Şubat – 18 Mart (approximate)
// Bayram: 19-20-21 Mart 2026
const EID_DATE = new Date("2026-03-19T00:00:00");

function formatTime(date: Date) {
  return date.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function formatDate(date: Date) {
  return date.toLocaleDateString("tr-TR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Simple iftar time estimation based on date (approximate for Turkey ~Istanbul)
function getIftarTime(date: Date): Date {
  const month = date.getMonth();
  const day = date.getDate();
  // Feb-March approximate sunset times for Istanbul
  let hour = 18;
  let minute = 10;
  if (month === 1) { // February
    minute = 10 + Math.floor(day * 0.5);
  } else if (month === 2) { // March
    hour = 18;
    minute = 20 + Math.floor(day * 0.6);
  }
  const iftar = new Date(date);
  iftar.setHours(hour, minute, 0, 0);
  return iftar;
}

const Index = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [apiIftar, setApiIftar] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const fetched = await getIftarFromAladhan(now);
        if (!cancelled && fetched) setApiIftar(fetched);
      } catch (e) {
        // ignore - keep fallback
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [now.toDateString()]);

  const iftarTime = useMemo(() => apiIftar ?? getIftarTime(now), [now.toDateString(), apiIftar?.getTime()]);
  const iftarPassed = now > iftarTime;

  const dailyAyet = useMemo(() => getDailyContent(ayetler), [now.toDateString()]);
  const dailyHadis = useMemo(() => getDailyContent(hadisler), [now.toDateString()]);
  const dailyDua = useMemo(() => getDailyContent(dualar), [now.toDateString()]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img
          src={ramadanBg}
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="text-center pt-10 pb-6 px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Moon className="w-10 h-10 text-primary mx-auto mb-3 animate-pulse-slow" />
            <h1 className="text-4xl md:text-5xl font-amiri font-bold gradient-gold mb-2">
              Ramazan-ı Şerif
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              M. Emin Saraç AİHL ailesi olarak huzur, sabır ve bereketle dolu bir Ramazan diliyoruz
            </p>
          </motion.div>
        </header>

        {/* Date & Time */}
        <motion.div
          className="text-center mb-8 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-1">
            <Clock className="w-4 h-4" />
            <span>{formatDate(now)}</span>
          </div>
          <p className="font-amiri text-2xl text-primary">{formatTime(now)}</p>
        </motion.div>

        {/* Iftar Section */}
        <motion.section
          className="max-w-2xl mx-auto mb-10 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-card-glass rounded-xl p-6 text-center shadow-gold">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">İstanbul (Tahmini)</span>
            </div>
            <p className="text-muted-foreground text-sm mb-1">İftar Vakti</p>
            <p className="font-amiri text-3xl text-primary mb-4">
              {iftarTime.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
            </p>
            {iftarPassed ? (
              <p className="text-emerald text-sm font-medium">İftar vakti geçti • Hayırlı iftarlar 🌙</p>
            ) : (
              <CountdownTimer targetDate={iftarTime} label="İftara Kalan Süre" />
            )}
          </div>
        </motion.section>

        {/* Eid Countdown */}
        <motion.section
          className="max-w-2xl mx-auto mb-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-card-glass rounded-xl p-6 shadow-gold">
            <CountdownTimer targetDate={EID_DATE} label="🎉 Ramazan Bayramı'na Kalan Süre" />
          </div>
        </motion.section>

        {/* Daily Content */}
        <section className="max-w-4xl mx-auto mb-12 px-4">
          <motion.h2
            className="text-center text-xl font-amiri text-primary mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            ✦ Günün İçeriği ✦
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-4">
            <ContentCard title="Günün Ayeti" icon="📖" content={dailyAyet} delay={0.7} />
            <ContentCard title="Günün Hadisi" icon="🕌" content={dailyHadis} delay={0.8} />
            <ContentCard title="Günün Duası" icon="🤲" content={dailyDua} delay={0.9} />
          </div>
        </section>

        {/* Random Content */}
        <section className="max-w-4xl mx-auto mb-16 px-4">
          <RandomContentButton />
        </section>

        {/* Footer */}
        <footer className="text-center pb-8 px-4">
          <p className="text-muted-foreground text-xs">
            Ramazan-ı Şerif Mübarek Olsun 🌙 — FraisenSenpai tarafından ❤ ile yapıldı
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
