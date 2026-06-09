import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false },
  alternates: { canonical: "/politique-de-confidentialite" },
};

const sections = [
  {
    h: "1. Définitions",
    p: "L'Éditeur désigne ATB Charpente, responsable du présent site. Le Site désigne l'ensemble des pages accessibles à l'adresse atb-charpente.fr. L'Utilisateur désigne toute personne consultant le Site.",
  },
  {
    h: "2. Nature des données collectées",
    p: "Dans le cadre de l'utilisation du Site, l'Éditeur est susceptible de collecter des données d'état civil, d'identité et d'identification (nom, prénom, e-mail, téléphone, code postal) que vous nous transmettez volontairement via le formulaire de contact.",
  },
  {
    h: "3. Communication des données à des tiers",
    p: "Vos données ne font l'objet d'aucune communication à des tiers, sauf obligation légale ou réquisition d'une autorité administrative ou judiciaire.",
  },
  {
    h: "4. Agrégation des données",
    p: "Des données non personnelles et anonymisées peuvent être utilisées à des fins statistiques afin d'améliorer le Site et nos services.",
  },
  {
    h: "5. Collecte des données d'identité",
    p: "La simple consultation du Site ne nécessite aucune inscription ni communication d'informations personnelles.",
  },
  {
    h: "6. Identification de l'Utilisateur",
    p: "Les informations transmises via le formulaire de contact sont utilisées uniquement pour répondre à votre demande et établir un éventuel devis.",
  },
  {
    h: "7. Données de terminal",
    p: "Des données techniques (adresse IP, type de navigateur) peuvent être collectées à des fins de fourniture du service et de statistiques d'audience.",
  },
  {
    h: "8. Cookies",
    p: "Les cookies éventuellement déposés ont une durée de conservation maximale de 13 mois. Vous pouvez les désactiver à tout moment via les paramètres de votre navigateur.",
  },
  {
    h: "9. Conservation des données techniques",
    p: "Les données techniques sont conservées uniquement le temps nécessaire aux finalités décrites ci-dessus.",
  },
  {
    h: "10. Conservation des données personnelles",
    p: "Vos données personnelles sont supprimées une fois votre demande traitée. Les données anonymisées peuvent être conservées à des fins statistiques. Une suppression automatique intervient après 3 ans d'inactivité.",
  },
  {
    h: "11. Suppression des données",
    p: `Vous pouvez demander la suppression de vos données à tout moment en écrivant à ${site.contact.email}.`,
  },
  {
    h: "12. Failles de sécurité",
    p: "L'Éditeur s'engage à vous informer dans les meilleurs délais en cas d'accès non autorisé à vos données.",
  },
  {
    h: "13. Transfert hors Union européenne",
    p: "Vos données ne sont pas transférées en dehors de l'Union européenne.",
  },
  {
    h: "14. Modification de la politique",
    p: "Toute modification substantielle de la présente politique fera l'objet d'une information sur le Site.",
  },
  {
    h: "15. Droits de l'Utilisateur (RGPD)",
    p: `Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de portabilité et d'opposition sur vos données. Pour l'exercer, contactez-nous à ${site.contact.email}.`,
  },
];

export default function ConfidentialitePage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-16 pt-28 lg:px-8">
      <h1 className="text-3xl font-bold text-anthracite">
        Politique de confidentialité
      </h1>
      <p className="mt-4 text-foreground/70">
        La présente politique décrit la manière dont {site.name} collecte et traite
        vos données personnelles sur le site atb-charpente.fr.
      </p>
      <div className="mt-8 space-y-6">
        {sections.map((s) => (
          <div key={s.h}>
            <h2 className="text-lg font-semibold text-anthracite">{s.h}</h2>
            <p className="mt-2 text-foreground/80">{s.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
