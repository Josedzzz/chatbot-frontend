interface UserHeaderProps {
  title: string;
}

export default function UserHeader({ title }: UserHeaderProps) {
  return (
    <header className="h-16 p-4 w-full rounded-xl bg-custom-white border-4 border-custom-black flex justify-between items-center">
      <div className="flex items-center space-x-1 gap-3">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-custom-black">
          Joki Chat
        </h1>
        <i className="fa-solid fa-robot text-xl sm:text-3xl md:text-4xl text-custom-black"></i>
      </div>
      <h2 className="text-xl sm:text-3xl font-bold text-custom-black">
        {title}
      </h2>
    </header>
  );
}
