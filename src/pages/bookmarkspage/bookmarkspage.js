import React from "react";
import Container from "../../components/container/container";
import SideBar from "../../components/Sidebar/Sidebar";
import HomeContainer from "../../components/homeContainer/homeContainer";
import Post from "../../components/post/post";
import Header from "../../components/header/header";
import LinksCard from "../../components/linksCard/linksCard";
import Feed from "../../components/feed/feed";
import Bookmarks from "../../components/bookmarks/bookmarks";

const BookmarksPage = props => {
    return(
        <div>
            <Header/>
            <Container>
                <SideBar>
                    <LinksCard/>
                </SideBar>
                <HomeContainer>
                    <Bookmarks/>
                </HomeContainer>
            </Container>
        </div>
    )
}

export default BookmarksPage;