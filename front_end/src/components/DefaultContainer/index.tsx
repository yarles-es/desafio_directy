type Props = {
  children: React.ReactNode;
  title?: string | React.ReactNode;
};

const DefaultContainer: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="mx-auto">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border shadow-default border-[#2e3a47] bg-[#24303f]">
          {title && (
            <div className="border-b py-4 px-6.5 border-[#2e3a47]">
              <h3 className="font-medium text-black dark:text-white">
                {title}
              </h3>
            </div>
          )}
          <div className="p-6.5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DefaultContainer;
