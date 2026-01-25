interface PageTitleProps {
  title: string;
  subtitle?: string;
  icon?: string;
}

export default function PageTitle({ title, subtitle, icon }: PageTitleProps) {
  return (
    <div className="mb-8 text-center sm:mb-12">
      {icon && (
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="text-4xl sm:text-5xl">{icon}</span>
          <h1 className="heading-main">{title}</h1>
        </div>
      )}
      {!icon && <h1 className="heading-main">{title}</h1>}
      {subtitle && <p className="mt-2 text-base text-neutral-400 sm:text-lg">{subtitle}</p>}
    </div>
  );
}
