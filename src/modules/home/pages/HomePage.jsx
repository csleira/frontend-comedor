import { AppHeroCard } from "../../../ui/components/AppHeroCard";
import comedorImg from "../../../assets/images/comedor-home.jpg";

export function HomePage() {
  return (
    <div className="w-full">
      <AppHeroCard 
        title="Bienvenido a nuestro Comedor"
        subtitle="Un espacio cálido donde cada plato se prepara con amor,
                  ingredientes frescos y el deseo de brindar una experiencia casera y deliciosa."
        backgroundImage={comedorImg}
      />
    </div>
  );
}