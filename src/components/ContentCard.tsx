import { motion } from "framer-motion";
import type { IslamicContent } from "@/data/islamicContent";

interface ContentCardProps {
  title: string;
  icon: string;
  content: IslamicContent;
  delay?: number;
}

const ContentCard = ({ title, icon, content, delay = 0 }: ContentCardProps) => {
  return (
    <motion.div
      className="bg-card-glass rounded-lg p-6 islamic-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-primary font-semibold text-lg">{title}</h3>
      </div>
      <p className="font-amiri text-foreground text-lg leading-relaxed mb-3">
        "{content.text}"
      </p>
      <p className="text-sm text-muted-foreground text-right">— {content.source}</p>
    </motion.div>
  );
};

export default ContentCard;
