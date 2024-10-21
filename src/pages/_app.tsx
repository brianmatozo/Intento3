import { ChakraProvider, ColorModeScript, type ThemeConfig } from "@chakra-ui/react";
import { GeistSans } from "geist/font/sans";
import theme from "lib/theme";
import type { Session } from "next-auth";
import { SessionProvider} from "next-auth/react";
import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <div className={GeistSans.className}>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={(theme.config as ThemeConfig).initialColorMode} />
        <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </div>
  );
};

export default MyApp;
