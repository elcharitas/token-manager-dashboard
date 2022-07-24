import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

export function SelectField({ sx, label, color, options = [], ...props }) {
  return (
    <Box sx={sx}>
      <FormControl fullWidth>
        <InputLabel color={color}>{label}</InputLabel>
        <Select label={label} color={color} {...props}>
          {options.map(({ value, label }, index) => (
            <MenuItem key={index} color={color} value={value}>
              {label || value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
