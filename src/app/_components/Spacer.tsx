type Props = {
  y: number;
};
//공간창출용!!
const Spacer = ({ y }: Props) => {
  return (
    <div
      style={{
        height: `${y}px`
      }}
    ></div>
  );
};

export default Spacer;
