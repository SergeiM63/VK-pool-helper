// import Product from '../Product/Product';
import './Products.css';
import formatText from '../../utils/formatText';

const Products = ({products, volume}) => {
  console.log(volume);

  return (
    <section className='Products'>
      <h2>Список товаров</h2>
      <ul className='Products__list'>
        {
          products.map(product => {
            return (
              <li
                key={ product.id }
                className="Products__list-item"
              >
                <img
                  src={product.photos[0].sizes[4].url} 
                  alt={ product.title }
                />
                <h3>{ product.title }</h3>
                <p>{ formatText(product.description, 150) }</p>
                
                <div className="Products__list-item-usage">
                  <h4>Расход на ваш бассейн:</h4>
                  <h5>
                    {
                      product.usage_start ?
                      (product.usage_start)*volume : '' 
                    } грамм (при первом запуске)
                  </h5>
                  <h5>
                    {
                      product.usage_week ?
                      (product.usage_week)*volume : '' 
                    } грамм (1раз в неделю)
                  </h5>
                </div>
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}

export default Products;