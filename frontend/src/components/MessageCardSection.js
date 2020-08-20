import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container} from '@material-ui/core' // MessageCardSection
import { Typography, Card, CardActions, IconButton, CardActionArea, CardContent } from '@material-ui/core' // MessageCard
import EnglandFlagImg from '../assets/united_kingdom_great_britain.png'
import JapanFlagImg from '../assets/ICON_RESIZED-Flag_of_Japan.svg.png'
import LanguageIcon from '@material-ui/icons/Language';
import CardStyling1 from '../assets/card1.png' 

function switchLangRender(props) {
  const { lang, messageObj } = props
  switch(lang) {
    case 'en':
      return <Typography variant="h5" component="h2">{messageObj.en}</Typography>
    case 'jp':
      return <Typography variant="h5" component="h2">{messageObj.jp}</Typography>
    case 'original':
      return <Typography variant="h5" component="h2">{messageObj.original}</Typography>
    default:
      return <Typography variant="h5" component="h2">{messageObj.jp}</Typography>
  }
}

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    backgroundImage: `url(${CardStyling1})`,
    backgroundRepeat: 'no-repeat'
  },
  media: {
    height: 650,
  }
});

function MessageCard(props) {
  const classes = useStyles();
  const { name, country, messageObj } = props
  const [lang, setLang] = React.useState("jp");
  const handleCardClick = () => {
    console.log(messageObj)
  }
  const messageText = switchLangRender({ lang, messageObj })

  return (
    <Card className={classes.root}>
      <CardActions>
        <IconButton onClick={() => setLang("en")}>
          <img src={EnglandFlagImg} alt="England Flag" classes={classes.iconSize} /> 
        </IconButton>
        <IconButton onClick={() => setLang("jp")}>
          <img src={JapanFlagImg} alt="Japan Flag" classes={classes.iconSize} /> 
        </IconButton>
        <IconButton onClick={() => setLang("original")}>
          <LanguageIcon fontSize="large" />
        </IconButton>
      </CardActions>
      <CardActionArea onClick={handleCardClick}>
        <CardContent>
          { messageText }
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {country}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default function MessageCardSection(props) {
  const { data } = props
  
  return (
    <Container>
      <h1>CARD SECTION</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={0}>
            {data.map((data, idx) => {
              const messageObj = {
                "original" : data.Native_message,
                "en": data.EN_message,
                "jp": data.JP_message_Deepl,
                "jp_corrected": data.JP_message_corrected
              }
              return (
                <Grid key={'Message' + idx} item xs={4}>
                  <MessageCard
                    name={data.Name}
                    country={data.Country}
                    messageObj={messageObj}
                  />
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}