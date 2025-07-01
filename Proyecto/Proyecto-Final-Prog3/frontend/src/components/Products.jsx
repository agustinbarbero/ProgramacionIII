import './Products.css';
import { AddToCartIcon } from './Icon';

export function Products ({ products}) {
    return (
        <div className="products">
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <img 
                        src={product.thumbnail}
                        alt={product.title}
                        />
                        <div>
                            <strong>{product.title}</strong>
                            <strong>{}</strong>
                        </div>
                        <div>
                            <button>
                                <AddToCartIcon />
                            </button>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    )
}