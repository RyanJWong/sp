import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "./Grid/GridContainer.js";
import GridItem from "./Grid/GridItem.js";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import PieChart from "./PieChart/PieChart.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import cardsStyle from "../styles/jss/nextjs-material-kit-pro/pages/presentationSections/cardsStyle.js";

const useStyles = makeStyles(cardsStyle);

// makeStyles((cardsStyle) => ({
//     section: {
//       backgroundColor: "rgb(0, 0, 0)",
//       backgroundImage: "/images/RandomStuff.png",
//   },
//     }));

export default function SectionCards() {
    const classes = useStyles();
    return (
        <div
            className={classNames(classes.section, classes.sectionDark)}
            style={{
                backgroundImage: "url('/images/SpaceObj.png')",
                backgroundPosition: "left",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className={classes.container}>
                <GridContainer justifyContent="center">
                    <GridItem md={7} sm={7}>
                        {/* <div className={classes.imageContainer} >
              <img src="/images/RandomStuff.png" alt="views" style={{position:'relative', display:'inline',}} />
              
            </div> */}
                        <Card
                            className={classes.root}
                            style={{ backgroundColor: "transparent" }}
                        >
                            <CardMedia
                                component="video"
                                autoPlay
                                controls
                                src="https://player.vimeo.com/external/652345635.hd.mp4?s=e0d290f1d2868e462e3fa80021b35cb9ab56fa24&profile_id=174"
                            />
                        </Card>
                    </GridItem>
                    <GridItem md={4} sm={5} className={classes.mlAuto}>
                        <div
                            className={classes.sectionDescription}
                            style={{ marginTop: "0px" }}
                        >
                            <h3 className={classes.title}>
                                Unconventional Cards
                            </h3>
                            <h6 className={classes.description}>
                                One Card for Every Problem
                            </h6>
                            <h5 className={classes.description}>
                                We love cards and everybody on the web seems to.
                                We have gone above and beyond with options for
                                you to organise your information. From cards
                                designed for blog posts, to product cards or
                                user profiles, you will have many options to
                                choose from. All the cards follow the material
                                principles and have a design that stands out.
                            </h5>
                        </div>
                    </GridItem>
                </GridContainer>
            </div>
            <div className={classes.container} style={{ paddingTop: "5em" }}>
                <GridContainer justifyContent="center">
                    <GridItem md={4} sm={5} className={classes.mlAuto}>
                        <div className={classes.sectionDescription}>
                            <h3 className={classes.title}>
                                Unconventional Cards
                            </h3>
                            <h6 className={classes.description}>
                                One Card for Every Problem
                            </h6>
                            <h5 className={classes.description}>
                                We love cards and everybody on the web seems to.
                                We have gone above and beyond with options for
                                you to organise your information. From cards
                                designed for blog posts, to product cards or
                                user profiles, you will have many options to
                                choose from. All the cards follow the material
                                principles and have a design that stands out.
                            </h5>
                        </div>
                    </GridItem>
                    <GridItem md={7} sm={7}>
                        <PieChart />
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
}
