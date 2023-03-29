// import Product from '../Product/Product';
import './Products.css';
import formatText from '../../utils/formatText';

const Products = ({products}) => {
  console.log(products);

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
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}

export default Products;