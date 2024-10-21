import { Badge, Box, Divider } from "@chakra-ui/react";
import CertificationStatus from "components/payments/CertificationStatus";
import { Client } from "models/client";
import { miscPayment } from "models/miscPayments";
import { onlineCourse } from "models/online";
import { getBadgeColor } from "schema/courseColorSchema";
import { MiscellaneousPayment } from "schema/miscPaymentSchemas";

interface CoursesListProps {
    client: Client;
    courses: onlineCourse[];
    payments: miscPayment[];
    courseStatuses: { [key: string]: { certification: boolean; matricula: boolean } };
    onStatusChange: (payment: MiscellaneousPayment) => void;
  }
  
  const CoursesList: React.FC<CoursesListProps> = ({ client,courses, payments, courseStatuses, onStatusChange }) => {
    return (
      <>
        {courses.map((course, index) => (
          <Box key={index}>
            <Box justifySelf={"center"}>
            <Badge colorScheme={getBadgeColor(course.name)} variant="solid" fontSize='1.1em' mt={1} >
              {course.name}
            </Badge>
            </Box>
            <CertificationStatus
              clientId={client._id}
              certificationStatus={courseStatuses[course._id]?.certification || false}
              matriculaStatus={courseStatuses[course._id]?.matricula || false}
              payments={payments.filter(p => p.courseId?.toString() === course._id)}
              onStatusChange={onStatusChange}
              courseId={course._id}
            />
            <Divider mt={2} />
          </Box>
        ))}
      </>
    );
  };
  
  export default CoursesList;