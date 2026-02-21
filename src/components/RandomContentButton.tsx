import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ayetler, hadisler, getRandomContent, type IslamicContent } from "@/data/islamicContent";

const RandomContentButton = () => {
  const [randomAyet, setRandomAyet] = useState<IslamicContent | null>(null);
  const [randomHadis, setRandomHadis] = useState<IslamicContent | null>(null);
  const [key, setKey] = useState(0);

  const handleRandom = () => {
    setRandomAyet(getRandomContent(ayetler));
    setRandomHadis(getRandomContent(hadisler));
    setKey((k) => k + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Button
          onClick={handleRandom}
          className="bg-primary text-primary-foreground hover:bg-gold-glow gap-2 text-base px-6 py-3 rounded-lg shadow-gold transition-all"
        >
          <Shuffle className="w-5 h-5" />
          Rastgele Ayet & Hadis Getir
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {randomAyet && randomHadis && (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-4"
          >
            <div className="bg-card-glass rounded-lg p-5 islamic-border">
              <p className="text-primary text-sm font-semibold mb-2">📖 Rastgele Ayet</p>
              <p className="font-amiri text-foreground text-lg leading-relaxed mb-2">
                "{randomAyet.text}"
              </p>
              <p className="text-sm text-muted-foreground text-right">— {randomAyet.source}</p>
            </div>
            <div className="bg-card-glass rounded-lg p-5 islamic-border">
              <p className="text-primary text-sm font-semibold mb-2">🕌 Rastgele Hadis</p>
              <p className="font-amiri text-foreground text-lg leading-relaxed mb-2">
                "{randomHadis.text}"
              </p>
              <p className="text-sm text-muted-foreground text-right">— {randomHadis.source}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RandomContentButton;
