import "@mantine/core/styles.css";
import "@mantine/core/styles.css";
import { MantineProvider,  } from "@mantine/core";
import { theme } from "./theme";
import Index from "./pages/Index";
import { Global } from "@emotion/react";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Global
        styles={() => ({
          body: {
            backgroundColor: "#EAE2C6", // Setting global background color
            margin: 0,
            padding: 0,
            fontFamily: "Roboto, sans-serif",
          },
          html: {
            height: "100%",
          },
        })}
      />
      <Index />
    </MantineProvider>
  );
}
