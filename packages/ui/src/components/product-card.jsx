import React, { useContext } from 'react';
import cn from 'classnames';
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardAttributes,
  CardAttribute,
  RatingStars
} from 'yarn-design-system-react-components';
import { I18nContext } from '../locales/i18n';

export function ProductCard({
  product: { productId, type, sport, badge, title, rating, imageSrc },
  horizontal,
  flat,
  children,
  className
}) {
  const _className = cn('product-card', className);

  const t = useContext(I18nContext);

  return (
    <Card className={ _className }
        name={ productId }
        horizontal={ horizontal }
        flat={ flat }>
      <CardHeader image={ imageSrc }>
        { badge && (
          <Badge color="black">
            { badge }
          </Badge>
        ) }
        { children && (
          <div className="product-card__wish">
            { children }
          </div>
        ) }
      </CardHeader>
      <CardBody>
        <CardTitle>{ productId }: { title }</CardTitle>
        { !horizontal && (
          <CardAttributes>
            <CardAttribute>{ t('component.product.category') }: { type }</CardAttribute>
            <CardAttribute>{ t('component.product.sport') }: { sport }</CardAttribute>
            { rating && (
              <CardAttribute>
                <span className="label">{ t('component.product.rating') }:</span>
                <RatingStars value={ rating } />
              </CardAttribute>
            ) }
          </CardAttributes>
        ) }
      </CardBody>
      { rating && horizontal && (
        <CardFooter>
          <RatingStars value={ rating } />
        </CardFooter>
      ) }
    </Card>
  );
}
