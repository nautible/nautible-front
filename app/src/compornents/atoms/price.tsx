import React from 'react';
import Typography from '@material-ui/core/Typography';

// 価格表示のコンポーネント
// 3桁区切りでカンマを打つのと、先頭に￥を付与します
// また、priceに値が設定されていないときは"-"を出力します
const Price: React.FC<{className?: string, value: number}> = ({className, value}) => {

  const formatter = new Intl.NumberFormat('ja-JP');
  let price = formatter.format(value)
  if (price === 'NaN') {
    price = '-'
  } else {
    price = "￥" + price
  }
  return (
    <Typography className={className}>{price}</Typography>
  )
}

export default Price