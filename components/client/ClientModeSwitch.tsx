import { Box, FormControl, FormLabel, Switch, Highlight } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import OnlineCourseComponent from "components/course/OnlineCourseComponent";

const ClientModeSwitch = () => {
  const { control, setValue, watch } = useFormContext();
  const [showOnlineCourse, setShowOnlineCourse] = useState(false);

  useEffect(() => {
    const subscription = watch((value)=>{
      setShowOnlineCourse(value.mode);
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
              isChecked={field.value}
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
        <Controller
          name="onlineCourses"
          control={control}
          render={({ field }) => (
            <OnlineCourseComponent
              {...field}
              defaultValue={[
                {
                  name: "",
                  startDate: new Date().toISOString().slice(0, 16),
                  expirationDate: "",
                  certification: false,
                  matricula: false,
                },
              ]}
              value={field.value}
            />
          )}
        />
      )}
    </Box>
  );
};

export default ClientModeSwitch;
