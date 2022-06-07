import List from "@material-ui/core/List";
import Image from 'next/image';
import ListItem from "@material-ui/core/ListItem";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import HeaderLinks from "../components/Header/HeaderLinks";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../components/CustomButtons/Button.js";
import styles from "../styles/jss/nextjs-material-kit-pro/pages/componentsSections/footerStyle.js";
const useStyles = makeStyles(styles);

export default function Layout(props) {
    const classes = useStyles();
    return (
        <div className="AppBarDiv">
            <Header
                brand="NextJS Material Kit PRO"
                links={<HeaderLinks dropdownHoverColor="info" />}
                fixed
                color="transparent"
                changeColorOnScroll={{
                height: 400,
                color: "info",
                }}
            />
            {props.children}
            <Footer
          theme="dark"
          content={
            <div>
              <div className={classes.left}>
                <a
                  href="/"
                  className={classes.footerBrand}
                >
                  <div className="drop-shadow-cl">
                    {/* <Image src={Logo} alt="logo" /> */}
                  </div>
                </a>
              </div>
              <div className={classes.pullCenter}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="http://blog.creative-tim.com/?ref=njsmkp-footer-components"
                      target="_blank"
                      className={classes.block}
                    >
                      Blog
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/presentation?ref=njsmkp-footer-components"
                      target="_blank"
                      className={classes.block}
                    >
                      Presentation
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="#pablito"
                      onClick={(e) => e.preventDefault()}
                      className={classes.block}
                    >
                      Discover
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="#pablito"
                      onClick={(e) => e.preventDefault()}
                      className={classes.block}
                    >
                      Payment
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/contact-us?ref=njsmkp-footer-components"
                      target="_blank"
                      className={classes.block}
                    >
                      Contact us
                    </a>
                  </ListItem>
                </List>
              </div>
              <div className={classes.rightLinks}>
                <ul>
                  <li>
                    <Button
                      href="https://twitter.com/CreativeTim?ref=creativetim"
                      target="_blank"
                      color="white"
                      justIcon
                      simple
                    >
                      <i className="fab fa-twitter" />
                    </Button>
                  </li>
                  <li>
                    <Button
                      href="https://dribbble.com/creativetim?ref=creativetim"
                      target="_blank"
                      color="white"
                      justIcon
                      simple
                    >
                      <i className="fab fa-dribbble" />
                    </Button>
                  </li>
                  <li>
                    <Button
                      href="https://instagram.com/CreativeTimOfficial?ref=creativetim"
                      target="_blank"
                      color="white"
                      justIcon
                      simple
                    >
                      <i className="fab fa-instagram" />
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          }
        />
        </div>
    );
}
