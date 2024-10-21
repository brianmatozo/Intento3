// components/client/ClientModeSwitch.tsx
import {
  Box,
  FormControl,
  FormLabel,
  Switch,
  Highlight,
  Flex,
} from "@chakra-ui/react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import OnlineCourseComponent from "components/course/OnlineCourseComponent";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const ClientModeSwitch = () => {
  const { control, setValue, watch } = useFormContext();
  const [showOnlineCourse, setShowOnlineCourse] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "onlineCourses",
  });

  useEffect(() => {
    const subscription = watch((value) => {
      setShowOnlineCourse(Boolean(value.mode));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Box mt={4}>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="mode" mt={2}>
          <Highlight
            query="Cliente Online?"
            styles={{
              px: "2",
              py: "1",
              rounded: "full",
              bg: "teal.500",
              color: "white",
            }}
          >
            Cliente Online?
          </Highlight>
        </FormLabel>
        <Controller
          name="mode"
          control={control}
          render={({ field }) => (
            <Switch
              id="mode"
              isChecked={field.value as boolean}
              onChange={(e) => {
                field.onChange(e.target.checked);
                setShowOnlineCourse(e.target.checked);
                // Clear onlineCourses when the switch is turned off
                if (!e.target.checked) {
                  setValue("onlineCourses", []); // Set onlineCourses to an empty array
                }
              }}
            />
          )}
        />
      </FormControl>
      {showOnlineCourse && (
        <>
          {fields.map((field, index) => (
            <Box key={field.id} mt={2}>
              <OnlineCourseComponent  index={index} />
              <DeleteIcon
                boxSize={8}
                cursor={"pointer"}
                color="red.500"
                onClick={() => remove(index)}
                position={"relative"}
                top={-39}
                right={-380}
              />
            </Box>
          ))}
          <Flex justifyContent={"center"}>
          <AddIcon
            cursor={"pointer"}
            boxSize={8}
            color={"green.500"}
            onClick={() =>
              append({
                startDate: new Date().toISOString().slice(0, 16),
              })
            }
          />
          </Flex>
        </>
      )}
    </Box>
  );
};

export default ClientModeSwitch;
