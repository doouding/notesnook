/*
This file is part of the Notesnook project (https://notesnook.com/)

Copyright (C) 2023 Streetwriters (Private) Limited

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { Button, Flex, Text } from "@theme-ui/components";
import { Context, useTip } from "../../hooks/use-tip";
import { Info } from "../icons";

type PlaceholderProps = { context: Context; text?: string };
function Placeholder(props: PlaceholderProps) {
  const { context, text } = props;
  const tip = useTip(context);

  if (!tip) return null;

  return (
    <>
      <Flex
        variant="columnCenter"
        sx={{
          position: "relative",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          alignSelf: "stretch",
          px: 6
        }}
      >
        <Flex
          sx={{
            border: "1px solid var(--accent)",
            borderRadius: 50,
            p: 1,
            py: "1.5px"
          }}
        >
          <Info color="accent" size={13} sx={{ mr: "small" }} />
          <Text variant="subBody" sx={{ fontSize: 10 }} color="accent">
            TIP
          </Text>
        </Flex>
        <Text variant="subBody" sx={{ fontSize: "body", mt: 1 }}>
          {text || tip.text}
        </Text>
        {tip.button && (
          <Button
            sx={{
              mt: 2,
              alignItems: "center",
              justifyContent: "center",
              display: "flex"
            }}
            variant="secondary"
            onClick={tip.button.onClick}
          >
            <Text mr={1} color="accent">
              {tip.button.title}
            </Text>
            {tip.button.icon && <tip.button.icon size={18} color="accent" />}
          </Button>
        )}
      </Flex>
    </>
  );
}
export default Placeholder;
