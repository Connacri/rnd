import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors {
  static const Color cream = Color(0xFFFAF7F2);
  static const Color surface = Color(0xFFFEFCFA);
  static const Color surfaceBeige = Color(0xFFEFE9DF);
  static const Color ink = Color(0xFF18181B);
  static const Color zinc700 = Color(0xFF3F3F46);
  static const Color zinc500 = Color(0xFF71717A);
  static const Color amber = Color(0xFFFBBF24);
  static const Color amber400 = Color(0xFFFACC15);
  static const Color amber200 = Color(0xFFFDE68A);
  static const Color amber300 = Color(0xFFFCD34D);
  static const Color rose400 = Color(0xFFF87171);
  static const Color rose600 = Color(0xFFE11D48);
  static const Color partyBlue = Color(0xFF0047AB);
  static const Color partyGreen = Color(0xFF00A651);
  static const Color partyRed = Color(0xFFC8102E);
}

class AppTheme {
  static const double radiusSm = 12.0;
  static const double radiusMd = 16.0;
  static const double radiusLg = 20.0;
  static const double radiusXl = 24.0;
  static const double radius2xl = 28.0;
  static const double radius3xl = 32.0;

  static ThemeData get lightTheme {
    final textTheme = GoogleFonts.robotoTextTheme(ThemeData.light().textTheme);

    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      scaffoldBackgroundColor: AppColors.cream,
      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.amber,
        brightness: Brightness.light,
        primary: AppColors.ink,
        onPrimary: Colors.white,
        secondary: AppColors.amber,
        surface: AppColors.surface,
        surfaceContainerHighest: AppColors.surfaceBeige,
        outline: AppColors.amber200.withValues(alpha: 0.8),
        outlineVariant: AppColors.surfaceBeige,
      ),
      textTheme: textTheme.apply(
        bodyColor: AppColors.ink,
        displayColor: AppColors.ink,
      ),
      appBarTheme: const AppBarTheme(
        centerTitle: false,
        elevation: 0,
        scrolledUnderElevation: 0,
        backgroundColor: AppColors.cream,
        foregroundColor: AppColors.ink,
        surfaceTintColor: Colors.transparent,
      ),
      cardTheme: CardThemeData(
        color: Colors.white,
        elevation: 0,
        shadowColor: Colors.black.withValues(alpha: 0.08),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(radius3xl),
          side: BorderSide(
              color: AppColors.amber200.withValues(alpha: 0.9), width: 1.2),
        ),
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          backgroundColor: AppColors.ink,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 22),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(999),
          ),
          textStyle: GoogleFonts.roboto(
              fontWeight: FontWeight.w700, letterSpacing: 0.2),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.amber400,
          foregroundColor: AppColors.ink,
          padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 22),
          elevation: 0,
          shadowColor: AppColors.amber.withValues(alpha: 0.25),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(999),
          ),
          textStyle: GoogleFonts.roboto(
              fontWeight: FontWeight.w700, letterSpacing: 0.2),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: AppColors.ink,
          side: BorderSide(color: AppColors.amber200.withValues(alpha: 0.9)),
          padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 22),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(999),
          ),
          textStyle: GoogleFonts.roboto(
              fontWeight: FontWeight.w600, letterSpacing: 0.2),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        contentPadding:
            const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMd),
          borderSide:
              BorderSide(color: AppColors.amber200.withValues(alpha: 0.9)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMd),
          borderSide:
              BorderSide(color: AppColors.amber200.withValues(alpha: 0.9)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(radiusMd),
          borderSide: const BorderSide(color: AppColors.amber400, width: 1.6),
        ),
        hintStyle: GoogleFonts.roboto(color: AppColors.zinc500),
        labelStyle: GoogleFonts.roboto(color: AppColors.zinc700),
      ),
      dividerTheme: DividerThemeData(
        color: AppColors.amber200.withValues(alpha: 0.9),
        thickness: 1,
      ),
    );
  }
}
