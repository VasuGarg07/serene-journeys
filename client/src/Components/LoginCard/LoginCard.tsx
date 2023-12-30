import styled from "@emotion/styled";

export const LoginCard = styled("article")(({ theme }) => ({
  maxWidth: "480px",
  // minHeight: "540px",
  boxSizing: "border-box",
  justifyContent: 'center',
  backgroundColor: "rgba(255, 255, 255, 0.32)",
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.24)',
  backdropFilter: 'blur(4px)',
  boxShadow:
    `0.9px 1.8px 2.2px rgba(0, 0, 0, 0.022),
  2.1px 4.3px 5.3px rgba(0, 0, 0, 0.032),
  4px 8px 10px rgba(0, 0, 0, 0.04),
  7.1px 14.3px 17.9px rgba(0, 0, 0, 0.048),
  13.4px 26.7px 33.4px rgba(0, 0, 0, 0.058),
  32px 64px 80px rgba(0, 0, 0, 0.08)`,
}));
