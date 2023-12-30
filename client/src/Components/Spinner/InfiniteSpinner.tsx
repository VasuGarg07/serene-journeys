import Box from "@mui/material/Box";
import CircularProgress, { CircularProgressProps, circularProgressClasses } from "@mui/material/CircularProgress";

const InfiniteSpinner = (props: CircularProgressProps) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        style={{
          color: "#d1d1d1",
          position: 'absolute'
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        style={{
          animationDuration: '1000ms',
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

export default InfiniteSpinner