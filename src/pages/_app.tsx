import { ChakraProvider } from "@chakra-ui/react";
import { GeistSans } from "geist/font/sans";
import { SessionProvider} from "next-auth/react";
import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/globals.css";

const MyApp: AppType<{ session: any }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <div className={GeistSans.className}>
      <SessionProvider session={session}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </div>
  );
};

export default MyApp;
