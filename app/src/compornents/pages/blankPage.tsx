import React from 'react';

import Grid from '@material-ui/core/Grid'

// blank画面
const BlankPage: React.FC = () => {

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '90vh' }} >
      <Grid item>
        ログインしてください<br></br>
        ユーザーID: user01<br></br>
        パスワード: 123
      </Grid>   
    </Grid> 
  );
}
export default BlankPage