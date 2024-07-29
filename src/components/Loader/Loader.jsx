import { CirclesWithBar } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.loaderHolder}>
      <CirclesWithBar
        height="200"
        width="200"
        color="#4337e4"
        outerCircleColor="#4337e4"
        innerCircleColor="#4337e4"
        barColor="#4337e4"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
