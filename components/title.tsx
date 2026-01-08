export const SectionTitle = ({ text }: { text: string }) => {
  return (
    <div>
      <h1 className="text-center text-5xl text-white mb-4">{text}</h1>
      <div className="mx-auto bg-primary h-1 w-24"></div>
    </div>
  );
};
