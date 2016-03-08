'use strict';

const React = require('react');
const {
  Layout,
  LayoutTitle,
  LayoutSpacer,
  LayoutHeader,
  LayoutDrawer,
  LayoutContent,
  LayoutHeaderRow,
  Navigation,
  NavigationLink
} = require('react-material-design-lite');

function Index(props){
  return (
    <html>
      <head>
      </head>
      <body>
        <Layout>
          <LayoutHeader fixed>
            <LayoutHeaderRow>
              <LayoutTitle>Panz.Cards</LayoutTitle>
            </LayoutHeaderRow>
          </LayoutHeader>

          <LayoutDrawer>
            <LayoutTitle>Panz.Cards</LayoutTitle>

            <Navigation>
              <NavigationLink href="">Link</NavigationLink>
              <NavigationLink href="">Link</NavigationLink>
              <NavigationLink href="">Link</NavigationLink>
              <NavigationLink href="">Link</NavigationLink>
            </Navigation>
          </LayoutDrawer>

          <LayoutContent>
            <div>Hello PanZ</div>
          </LayoutContent>
        </Layout>
      </body>
    </html>
  );
}

module.exports = Index;
