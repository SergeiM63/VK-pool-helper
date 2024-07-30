import { Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import poolCircle from '../../img/icons/circle.webp';

const ButtonShape = ({label, poolShape, setPoolShape}) => {
  return (
    <Button
      onClick={() => setPoolShape('circle')}
    >
      <label>{ label }</label>
      <img
        className={poolShape === 'circle' ? 'Button__img Button__img--active' : 'Button__img'}
        src={poolCircle}
      />
    </Button>
  );
};

export default ButtonShape;