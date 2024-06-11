import "./styles/animations.css";

const MainLoader = ({ styles }: { styles: string }) => {
  return (
    <>
      <section className={`flex items-center fixed inset-0 bg-white z-50 justify-center ${styles}`}>
        <div className="load-animation lg:w-16 w-16 h-16 lg:h-16 rounded-full"></div>
      </section>
    </>
  );
};

export default MainLoader;
